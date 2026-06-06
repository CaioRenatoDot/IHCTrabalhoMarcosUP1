import { Router } from 'express'
import {
  buildTemporaryAssessmentResponse,
  validateRiskAssessmentPayload,
} from '../domain/riskAssessmentPayload.js'

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

  return response.status(200).json({
    ...buildTemporaryAssessmentResponse(),
    meta: {
      receivedFields: Object.keys(request.body).length,
      extraFields: validation.extraFields,
      unmappedFields: validation.extraFields,
    },
  })
})

export default riskAssessmentRouter
