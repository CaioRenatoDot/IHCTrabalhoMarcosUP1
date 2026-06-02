import { AppError } from '../utils/errors.js'

export function notFoundHandler(_req, res) {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada.',
  })
}

export function errorHandler(error, _req, res, _next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message,
      ...(error.details ? { details: error.details } : {}),
    })
  }

  if (error?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({
      success: false,
      error: 'E-mail já cadastrado.',
    })
  }

  console.error(error)

  return res.status(500).json({
    success: false,
    error: 'Erro interno do servidor.',
  })
}
