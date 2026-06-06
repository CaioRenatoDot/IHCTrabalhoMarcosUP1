import { Router } from 'express'
import { z } from 'zod'
import { env, hasSupabaseConfig } from '../config/env.js'
import { createSupabaseServerClient } from '../lib/supabase.js'
import { getAuthDiagnostics, recordAuthEvent } from '../lib/audit.js'

export const authRouter = Router()

const credentialsSchema = z.object({
  email: z.string().email('Informe um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

const signupSchema = credentialsSchema.extend({
  fullName: z.string().trim().min(3, 'Digite seu nome completo'),
  acceptedTerms: z.literal(true),
})

function sanitizeUser(user) {
  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.user_metadata?.full_name ?? user.user_metadata?.name ?? '',
    createdAt: user.created_at,
    emailConfirmedAt: user.email_confirmed_at ?? null,
  }
}

function buildSession(user) {
  if (!user) {
    return null
  }

  return {
    user: sanitizeUser(user),
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

  recordAuthEvent('session_checked', req, { userId: data.user.id })

  return res.json({
    ok: true,
    session: buildSession(data.user),
    user: sanitizeUser(data.user),
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

  recordAuthEvent('login_success', req, { userId: data.user.id })

  return res.json({
    ok: true,
    session: buildSession(data.user),
    user: sanitizeUser(data.user),
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
  const session = data?.session?.user ? buildSession(data.session.user) : buildSession(user)

  recordAuthEvent('signup_success', req, {
    userId: user?.id ?? null,
    requiresConfirmation: !data?.session,
  })

  return res.status(201).json({
    ok: true,
    requiresConfirmation: !data?.session,
    session,
    user: sanitizeUser(user),
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
  const { error } = await supabase.auth.signOut()

  if (error) {
    return res.status(400).json({
      ok: false,
      error: error.message || 'Não foi possível sair da sessão',
    })
  }

  recordAuthEvent('logout_success', req, {})

  return res.json({
    ok: true,
  })
})
