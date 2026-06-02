import { Router } from 'express'
import db from '../db.js'
import { authenticate } from '../middleware/auth.js'
import { AppError } from '../utils/errors.js'
import { parseBody, questionnaireSchema } from '../validators/schemas.js'

const router = Router()

function formatResponse(row) {
  return {
    id: row.id,
    userId: row.user_id,
    answers: JSON.parse(row.answers),
    createdAt: row.created_at,
  }
}

router.post('/responses', authenticate, (req, res, next) => {
  try {
    const parsed = parseBody(questionnaireSchema, req.body)

    if (!parsed.success) {
      throw new AppError(400, 'Respostas do questionário inválidas.', parsed.details)
    }

    const answersJson = JSON.stringify(parsed.data.answers)

    const result = db
      .prepare('INSERT INTO questionnaire_responses (user_id, answers) VALUES (?, ?)')
      .run(req.user.id, answersJson)

    const saved = db
      .prepare('SELECT id, user_id, answers, created_at FROM questionnaire_responses WHERE id = ?')
      .get(result.lastInsertRowid)

    return res.status(201).json({
      success: true,
      data: { response: formatResponse(saved) },
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/responses', authenticate, (req, res, next) => {
  try {
    const rows = db
      .prepare(
        `SELECT id, user_id, answers, created_at
         FROM questionnaire_responses
         WHERE user_id = ?
         ORDER BY created_at DESC`,
      )
      .all(req.user.id)

    return res.json({
      success: true,
      data: {
        responses: rows.map(formatResponse),
      },
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/responses/:id', authenticate, (req, res, next) => {
  try {
    const responseId = Number(req.params.id)

    if (!Number.isInteger(responseId) || responseId <= 0) {
      throw new AppError(400, 'ID de resposta inválido.')
    }

    const row = db
      .prepare(
        `SELECT id, user_id, answers, created_at
         FROM questionnaire_responses
         WHERE id = ? AND user_id = ?`,
      )
      .get(responseId, req.user.id)

    if (!row) {
      throw new AppError(404, 'Resposta do questionário não encontrada.')
    }

    return res.json({
      success: true,
      data: { response: formatResponse(row) },
    })
  } catch (error) {
    return next(error)
  }
})

export default router
