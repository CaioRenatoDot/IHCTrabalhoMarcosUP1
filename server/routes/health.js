import { Router } from 'express'
import { env, hasSupabaseConfig } from '../config/env.js'

export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'riskcare-backend',
    configured: hasSupabaseConfig,
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})
