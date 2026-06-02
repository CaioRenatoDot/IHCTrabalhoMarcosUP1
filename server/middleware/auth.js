import { AppError } from '../utils/errors.js'
import { verifyToken } from '../utils/jwt.js'

export function authenticate(req, _res, next) {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return next(new AppError(401, 'Token de autenticação ausente ou inválido.'))
  }

  const token = header.slice(7)

  try {
    const payload = verifyToken(token)
    req.user = { id: payload.sub, email: payload.email }
    return next()
  } catch {
    return next(new AppError(401, 'Sessão expirada ou token inválido.'))
  }
}
