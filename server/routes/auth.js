import { Router } from 'express'
import { z } from 'zod'
import { env, hasSupabaseConfig } from '../config/env.js'
import { createSupabaseServerClient } from '../lib/supabase.js'
import { getAuthDiagnostics, persistAuthEvent, recordAuthEvent } from '../lib/audit.js'
import {
  getLatestRiskAssessmentForUser,
  getUserProfileByUserId,
  recordConsentAcceptance,
  upsertUserProfile,
  USER_DATA_CONSENT_TYPE,
  USER_DATA_CONSENT_VERSION,
} from '../lib/userData.js'

export const authRouter = Router()

const credentialsSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

const signupSchema = credentialsSchema.extend({
  fullName: z.string().trim().min(3, 'Digite seu nome completo'),
  acceptedTerms: z.literal(true),
})

function resolveFullName(user, profile) {
  const profileName = typeof profile?.fullName === 'string' ? profile.fullName.trim() : ''

  if (profileName.length > 0) {
    return profileName
  }

  const authName = user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? ''
  return typeof authName === 'string' ? authName.trim() : ''
}

function sanitizeUser(user, profile = null) {
  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    fullName: resolveFullName(user, profile),
    createdAt: user.created_at,
    emailConfirmedAt: user.email_confirmed_at ?? null,
  }
}

function buildSession(user, profile = null) {
  if (!user) {
    return null
  }

  return {
    user: sanitizeUser(user, profile),
  }
}

function mapLatestAssessmentForSession(record) {
  if (!record) {
    return null
  }

  return {
    status: 'accepted',
    message: 'Avaliação recuperada com sucesso.',
    modelVersion: record.modelVersion ?? record.riskModelVersion?.version ?? null,
    score: record.score,
    rawScore: record.rawScore,
    classification: record.classification,
    groupScores: record.groupScoresJson ?? {},
    factorBreakdown: record.factorBreakdownJson ?? record.assessmentFactorDetails ?? [],
    warnings: record.warningsJson ?? [],
    sourcesUsed: record.sourcesJson ?? [],
    normalizedGroups: record.questionnaireResponse?.normalizedSnapshotJson?.normalizedGroups ?? {},
    mappingSummary: record.questionnaireResponse?.normalizedSnapshotJson?.mappingSummary ?? null,
    persistence: {
      attempted: true,
      saved: true,
      source: 'database',
    },
    meta: {
      source: 'database',
      createdAt: record.createdAt,
      submittedAt: record.questionnaireResponse?.submittedAt ?? null,
      responseId: record.responseId,
    },
    userId: record.userId,
  }
}

function handleValidationError(res, error) {
  return res.status(400).json({
    ok: false,
    error: error.issues[0]?.message ?? 'Dados inválidos',
  })
}

authRouter.get('/health', (_req, res) => {
  res.json({
    ok: true,
    configured: hasSupabaseConfig,
    supabaseConfigured: hasSupabaseConfig,
    sessionCookieName: env.SESSION_COOKIE_NAME,
    csrfCookieName: env.CSRF_COOKIE_NAME,
    auditEnabled: true,
    csrfEnabled: true,
    rateLimitWindowMs: env.RATE_LIMIT_WINDOW_MS,
    rateLimitMax: env.RATE_LIMIT_MAX,
  })
})

authRouter.get('/diagnostic', (_req, res) => {
  res.json({
    ok: true,
    configured: hasSupabaseConfig,
    diagnostics: getAuthDiagnostics(),
  })
})

authRouter.get('/session', async (req, res) => {
  if (!hasSupabaseConfig) {
    return res.status(503).json({
      ok: false,
      error: 'Supabase not configured',
      session: null,
      user: null,
    })
  }

  const supabase = createSupabaseServerClient(req, res)
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return res.json({
      ok: true,
      session: null,
      user: null,
    })
  }

  let profile = null

  try {
    profile = await getUserProfileByUserId(data.user.id)

    if (!profile) {
      const fullName = resolveFullName(data.user, null)

      if (fullName) {
        profile = await upsertUserProfile({
          userId: data.user.id,
          fullName,
        })
      }
    }
  } catch (profileError) {
    console.warn('[profile-sync] session', profileError)
  }

  const latestAssessment = mapLatestAssessmentForSession(
    await getLatestRiskAssessmentForUser(data.user.id),
  )

  void persistAuthEvent({
    userId: data.user.id,
    eventType: 'session_checked',
    req,
    details: { source: 'session_endpoint' },
  }).catch((persistError) => {
    console.warn('[auth-event-persist] session_checked', persistError)
  })

  return res.json({
    ok: true,
    session: buildSession(data.user, profile),
    user: sanitizeUser(data.user, profile),
    latestAssessment,
  })
})

authRouter.post('/login', async (req, res) => {
  const parsed = credentialsSchema.safeParse(req.body)

  if (!parsed.success) {
    return handleValidationError(res, parsed.error)
  }

  if (!hasSupabaseConfig) {
    return res.status(503).json({
      ok: false,
      error: 'Supabase not configured',
    })
  }

  const supabase = createSupabaseServerClient(req, res)
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error || !data?.user) {
    recordAuthEvent('login_failed', req, { email: parsed.data.email })

    return res.status(401).json({
      ok: false,
      error: 'E-mail ou senha inválidos',
    })
  }

  let profile = null

  try {
    profile = await getUserProfileByUserId(data.user.id)

    if (!profile) {
      const fullName = resolveFullName(data.user, null)

      if (fullName) {
        profile = await upsertUserProfile({
          userId: data.user.id,
          fullName,
        })
      }
    }
  } catch (profileError) {
    console.warn('[profile-sync] login', profileError)
  }

  void persistAuthEvent({
    userId: data.user.id,
    eventType: 'login_success',
    req,
    details: { email: parsed.data.email },
  }).catch((persistError) => {
    console.warn('[auth-event-persist] login_success', persistError)
  })

  return res.json({
    ok: true,
    session: buildSession(data.user, profile),
    user: sanitizeUser(data.user, profile),
  })
})

authRouter.post('/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body)

  if (!parsed.success) {
    return handleValidationError(res, parsed.error)
  }

  if (!hasSupabaseConfig) {
    return res.status(503).json({
      ok: false,
      error: 'Supabase not configured',
    })
  }

  const supabase = createSupabaseServerClient(req, res)
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
      },
      emailRedirectTo: `${env.FRONTEND_ORIGIN}/login`,
    },
  })

  if (error) {
    recordAuthEvent('signup_failed', req, { email: parsed.data.email })

    return res.status(400).json({
      ok: false,
      error: error.message || 'Não foi possível criar a conta',
    })
  }

  const user = data?.user ?? null
  let profile = null

  if (user?.id) {
    try {
      profile = await upsertUserProfile({
        userId: user.id,
        fullName: parsed.data.fullName,
      })

      await recordConsentAcceptance({
        userId: user.id,
        consentType: USER_DATA_CONSENT_TYPE,
        consentVersion: USER_DATA_CONSENT_VERSION,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      })
    } catch (persistenceError) {
      console.warn('[profile-sync] signup', persistenceError)
    }

    void persistAuthEvent({
      userId: user.id,
      eventType: 'signup_success',
      req,
      details: {
        requiresConfirmation: !data?.session,
        email: parsed.data.email,
      },
    }).catch((persistError) => {
      console.warn('[auth-event-persist] signup_success', persistError)
    })
  }

  const session = data?.session?.user
    ? buildSession(data.session.user, profile)
    : buildSession(user, profile)

  return res.status(201).json({
    ok: true,
    requiresConfirmation: !data?.session,
    session,
    user: sanitizeUser(user, profile),
  })
})

authRouter.post('/logout', async (req, res) => {
  if (!hasSupabaseConfig) {
    return res.status(503).json({
      ok: false,
      error: 'Supabase not configured',
    })
  }

  const supabase = createSupabaseServerClient(req, res)
  const { data: currentUserData } = await supabase.auth.getUser()
  const currentUserId = currentUserData?.user?.id ?? null
  const { error } = await supabase.auth.signOut()

  if (error) {
    return res.status(400).json({
      ok: false,
      error: error.message || 'Não foi possível sair da sessão',
    })
  }

  void persistAuthEvent({
    userId: currentUserId,
    eventType: 'logout_success',
    req,
    details: {},
  }).catch((persistError) => {
    console.warn('[auth-event-persist] logout_success', persistError)
  })

  return res.json({
    ok: true,
  })
})
