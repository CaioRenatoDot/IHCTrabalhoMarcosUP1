import { Router } from 'express'
import { buildMappingSummary, validateRiskAssessmentPayload } from '../lib/riskAssessment/riskAssessmentPayload.js'
import { evaluateRiskAssessment } from '../lib/riskAssessment/score.js'
import { requireAuthSession } from '../middleware/requireAuthSession.js'
import { getLatestRiskAssessmentForUser, persistAssessmentSubmission } from '../lib/userData.js'

export const riskAssessmentRouter = Router()

function mapPersistedAssessment(record) {
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

riskAssessmentRouter.get('/latest', requireAuthSession, async (request, response) => {
  const assessment = await getLatestRiskAssessmentForUser(request.authUser?.id ?? null)

  return response.status(200).json({
    ok: true,
    hasAssessment: Boolean(assessment),
    assessment: mapPersistedAssessment(assessment),
  })
})

riskAssessmentRouter.post('/', requireAuthSession, async (request, response) => {
  const validation = validateRiskAssessmentPayload(request.body)

  if (!validation.isValid) {
    return response.status(400).json({
      status: 'error',
      message: 'Payload de avaliacao invalido.',
      errors: validation.errors,
      meta: {
        receivedFields: Object.keys(request.body ?? {}).length,
        extraFields: validation.extraFields ?? [],
        unmappedFields: validation.extraFields ?? [],
      },
      mappingSummary: buildMappingSummary(),
    })
  }

  const assessmentResult = evaluateRiskAssessment(request.body)

  let persistence = {
    attempted: true,
    saved: false,
  }

  try {
    const persistenceResult = await persistAssessmentSubmission({
      userId: request.authUser?.id ?? null,
      payload: request.body,
      assessment: assessmentResult,
      fullName: request.body?.fullName,
      state: request.body?.state,
    })

    persistence = {
      attempted: true,
      saved: Boolean(persistenceResult?.saved),
      modelVersion: persistenceResult?.modelVersion ?? assessmentResult.modelVersion ?? null,
    }
  } catch (persistenceError) {
    console.warn('[assessment-persistence]', persistenceError)
  }

  return response.status(200).json({
    ...assessmentResult,
    mappingSummary: buildMappingSummary(),
    meta: {
      receivedFields: Object.keys(request.body).length,
      extraFields: validation.extraFields ?? [],
      unmappedFields: validation.extraFields ?? [],
    },
    userId: request.authUser?.id ?? null,
    persistence,
  })
})
