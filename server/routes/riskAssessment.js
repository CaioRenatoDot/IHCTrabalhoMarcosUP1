import { Router } from 'express'
import { buildMappingSummary, validateRiskAssessmentPayload } from '../lib/riskAssessment/riskAssessmentPayload.js'
import { evaluateRiskAssessment } from '../lib/riskAssessment/score.js'

export const riskAssessmentRouter = Router()

riskAssessmentRouter.post('/', (request, response) => {
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

  return response.status(200).json({
    ...assessmentResult,
    mappingSummary: buildMappingSummary(),
    meta: {
      receivedFields: Object.keys(request.body).length,
      extraFields: validation.extraFields ?? [],
      unmappedFields: validation.extraFields ?? [],
    },
  })
})
