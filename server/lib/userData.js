import { prisma } from './prisma.js'
import { buildMappingSummary } from './riskAssessment/riskAssessmentPayload.js'
import { normalizeAssessmentPayload } from './riskAssessment/normalize.js'

export const USER_DATA_FORM_VERSION = 'assessment-form-v1'
export const USER_DATA_MODEL_VERSION = 'risk-model-v1'
export const USER_DATA_CONSENT_VERSION = 'terms-privacy-v1'
export const USER_DATA_CONSENT_TYPE = 'terms_and_privacy'

function toStringOrEmpty(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function toNullableString(value) {
  const text = toStringOrEmpty(value)
  return text.length > 0 ? text : null
}

function buildProfileData({ userId, fullName, state }) {
  return {
    userId,
    fullName: toStringOrEmpty(fullName) || 'Usuário RiskCare',
    ...(state !== undefined ? { state: toNullableString(state) } : {}),
  }
}

export async function upsertUserProfile({ userId, fullName, state }) {
  if (!userId) {
    return null
  }

  const profileData = buildProfileData({ userId, fullName, state })

  return prisma.profile.upsert({
    where: { userId },
    create: profileData,
    update: {
      fullName: profileData.fullName,
      ...(state !== undefined ? { state: profileData.state } : {}),
    },
  })
}

export async function recordConsentAcceptance({
  userId,
  consentType = USER_DATA_CONSENT_TYPE,
  consentVersion = USER_DATA_CONSENT_VERSION,
  ip,
  userAgent,
}) {
  if (!userId) {
    return null
  }

  return prisma.consentRecord.create({
    data: {
      userId,
      consentType,
      consentVersion,
      ip: toNullableString(ip),
      userAgent: toNullableString(userAgent),
    },
  })
}

export async function persistAssessmentSubmission({
  userId,
  payload,
  assessment,
  fullName,
  state,
  formVersion = USER_DATA_FORM_VERSION,
  modelVersion = USER_DATA_MODEL_VERSION,
}) {
  if (!userId) {
    return {
      saved: false,
      reason: 'missing-user',
    }
  }

  const normalizedSnapshot = normalizeAssessmentPayload(payload)
  const mappingSummary = buildMappingSummary()

  return prisma.$transaction(async (tx) => {
    const profile = await tx.profile.upsert({
      where: { userId },
      create: buildProfileData({ userId, fullName, state }),
      update: {
        fullName: buildProfileData({ userId, fullName, state }).fullName,
        ...(state !== undefined ? { state: toNullableString(state) } : {}),
      },
    })

    const questionnaireResponse = await tx.questionnaireResponse.create({
      data: {
        userId,
        formVersion,
        payloadJson: payload,
        normalizedSnapshotJson: {
          normalizedFields: normalizedSnapshot.normalizedFields,
          normalizedGroups: normalizedSnapshot.normalizedGroups,
          mappingSummary,
        },
      },
    })

    const riskAssessment = await tx.riskAssessment.create({
      data: {
        userId,
        responseId: questionnaireResponse.id,
        modelVersion,
        score: assessment.score,
        rawScore: assessment.rawScore,
        classification: assessment.classification,
        groupScoresJson: assessment.groupScores,
        factorBreakdownJson: assessment.factorBreakdown,
        warningsJson: assessment.warnings,
        sourcesJson: assessment.sourcesUsed,
      },
    })

    return {
      saved: true,
      profile,
      questionnaireResponse,
      riskAssessment,
    }
  })
}

