import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import { env, hasSupabaseConfig } from './config/env.js'
import { authRateLimit } from './middleware/rateLimiters.js'
import { verifyCsrfToken } from './middleware/csrf.js'
import { healthRouter } from './routes/health.js'
import { securityRouter } from './routes/security.js'
import { authRouter } from './routes/auth.js'
import { riskAssessmentRouter } from './routes/riskAssessment.js'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  )
  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN,
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use('/api/health', healthRouter)
  app.use('/api/security', securityRouter)
  app.use('/api/auth', authRateLimit, verifyCsrfToken, authRouter)
  app.use('/api/risk-assessment', authRateLimit, verifyCsrfToken, riskAssessmentRouter)

  app.use((_req, res) => {
    res.status(404).json({
      ok: false,
      error: 'Endpoint not found',
      configured: hasSupabaseConfig,
    })
  })

  app.use((error, _req, res, _next) => {
    console.error(error)
    res.status(500).json({
      ok: false,
      error: 'Unexpected server error',
    })
  })

  return app
}
