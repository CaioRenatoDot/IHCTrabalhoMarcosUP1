import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'

export const authRateLimit = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    ok: false,
    error: 'Muitas tentativas. Tente novamente em alguns minutos.',
  },
  skip: (req) =>
    req.method === 'GET' && ['/session', '/health', '/diagnostic'].includes(req.path),
})
