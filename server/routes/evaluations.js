import { Router } from 'express'
import db from '../db.js'
import { authenticate } from '../middleware/auth.js'
import { generateEvaluationFromAnswers } from '../services/evaluationEngine.js'
import { AppError } from '../utils/errors.js'
import { evaluationSchema, parseBody } from '../validators/schemas.js'

const router = Router()

function formatEvaluation(row) {
  return {
    id: row.id,
    userId: row.user_id,
    questionnaireResponseId: row.questionnaire_response_id,
    riskScore: row.risk_score,
    riskLevel: row.risk_level,
    summary: row.summary,
    details: JSON.parse(row.details),
    createdAt: row.created_at,
  }
}

function getOwnedResponse(responseId, userId) {
  return db
    .prepare(
      `SELECT id, user_id, answers, created_at
       FROM questionnaire_responses
       WHERE id = ? AND user_id = ?`,
    )
    .get(responseId, userId)
}

router.post('/', authenticate, (req, res, next) => {
  try {
    const parsed = parseBody(evaluationSchema, req.body)

    if (!parsed.success) {
      throw new AppError(400, 'Dados para avaliação inválidos.', parsed.details)
    }

    let answers
    let questionnaireResponseId = parsed.data.questionnaireResponseId

    if (questionnaireResponseId) {
      const response = getOwnedResponse(questionnaireResponseId, req.user.id)

      if (!response) {
        throw new AppError(404, 'Resposta do questionário não encontrada.')
      }

      answers = JSON.parse(response.answers)
    } else {
      answers = parsed.data.answers

      const insert = db
        .prepare('INSERT INTO questionnaire_responses (user_id, answers) VALUES (?, ?)')
        .run(req.user.id, JSON.stringify(answers))

      questionnaireResponseId = insert.lastInsertRowid
    }

    const existingEvaluation = db
      .prepare('SELECT id FROM evaluations WHERE questionnaire_response_id = ?')
      .get(questionnaireResponseId)

    if (existingEvaluation) {
      throw new AppError(
        409,
        'Já existe uma avaliação para esta resposta do questionário.',
      )
    }

    const evaluation = generateEvaluationFromAnswers(answers)

    const result = db
      .prepare(
        `INSERT INTO evaluations (
          user_id,
          questionnaire_response_id,
          risk_score,
          risk_level,
          summary,
          details
        ) VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(
        req.user.id,
        questionnaireResponseId,
        evaluation.riskScore,
        evaluation.riskLevel,
        evaluation.summary,
        JSON.stringify(evaluation.details),
      )

    const saved = db
      .prepare(
        `SELECT id, user_id, questionnaire_response_id, risk_score, risk_level, summary, details, created_at
         FROM evaluations WHERE id = ?`,
      )
      .get(result.lastInsertRowid)

    return res.status(201).json({
      success: true,
      data: { evaluation: formatEvaluation(saved) },
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/', authenticate, (req, res, next) => {
  try {
    const rows = db
      .prepare(
        `SELECT id, user_id, questionnaire_response_id, risk_score, risk_level, summary, details, created_at
         FROM evaluations
         WHERE user_id = ?
         ORDER BY created_at DESC`,
      )
      .all(req.user.id)

    return res.json({
      success: true,
      data: {
        evaluations: rows.map(formatEvaluation),
      },
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', authenticate, (req, res, next) => {
  try {
    const evaluationId = Number(req.params.id)

    if (!Number.isInteger(evaluationId) || evaluationId <= 0) {
      throw new AppError(400, 'ID de avaliação inválido.')
    }

    const row = db
      .prepare(
        `SELECT id, user_id, questionnaire_response_id, risk_score, risk_level, summary, details, created_at
         FROM evaluations
         WHERE id = ? AND user_id = ?`,
      )
      .get(evaluationId, req.user.id)

    if (!row) {
      throw new AppError(404, 'Avaliação não encontrada.')
    }

    return res.json({
      success: true,
      data: { evaluation: formatEvaluation(row) },
    })
  } catch (error) {
    return next(error)
  }
})

export default router
