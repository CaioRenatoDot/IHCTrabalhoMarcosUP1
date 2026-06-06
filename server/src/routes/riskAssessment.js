import { Router } from 'express'
import { buildMappingSummary, validateRiskAssessmentPayload } from '../domain/riskAssessmentPayload.js'
import { evaluateRiskAssessment } from '../domain/score.js'

const riskAssessmentRouter = Router()

riskAssessmentRouter.post('/risk-assessment', (request, response) => {
  const validation = validateRiskAssessmentPayload(request.body)

  if (!validation.isValid) {
    return response.status(400).json({
      status: 'error',
      message: 'Payload de avaliacao invalido.',
      errors: validation.errors,
    })
  }

  const assessmentResult = evaluateRiskAssessment(request.body)

  return response.status(200).json({
    ...assessmentResult,
    mappingSummary: buildMappingSummary(),
    meta: {
      receivedFields: Object.keys(request.body).length,
      extraFields: validation.extraFields,
      unmappedFields: validation.extraFields,
    },
  })
})

export default riskAssessmentRouter
