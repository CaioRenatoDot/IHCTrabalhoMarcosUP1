import { Router } from 'express'
import { buildMappingSummary, validateRiskAssessmentPayload } from '../lib/riskAssessment/riskAssessmentPayload.js'
import { evaluateRiskAssessment } from '../lib/riskAssessment/score.js'
import { requireAuthSession } from '../middleware/requireAuthSession.js'
import { persistAssessmentSubmission } from '../lib/userData.js'

export const riskAssessmentRouter = Router()

riskAssessmentRouter.post('/', requireAuthSession, (request, response) => {
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

  Promise.resolve(
    persistAssessmentSubmission({
      userId: request.authUser?.id ?? null,
      payload: request.body,
      assessment: assessmentResult,
      fullName: request.body?.fullName,
      state: request.body?.state,
    }),
  ).catch((persistenceError) => {
    console.warn('[assessment-persistence]', persistenceError)
  })

  return response.status(200).json({
    ...assessmentResult,
    mappingSummary: buildMappingSummary(),
    meta: {
      receivedFields: Object.keys(request.body).length,
      extraFields: validation.extraFields ?? [],
      unmappedFields: validation.extraFields ?? [],
    },
    userId: request.authUser?.id ?? null,
    persistence: {
      attempted: true,
    },
  })
})
