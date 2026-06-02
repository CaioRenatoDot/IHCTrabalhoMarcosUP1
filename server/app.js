import express from 'express'
import cors from 'cors'
import { config } from './config.js'
import authRoutes from './routes/auth.js'
import questionnaireRoutes from './routes/questionnaire.js'
import evaluationRoutes from './routes/evaluations.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok' } })
})

app.use('/api/auth', authRoutes)
app.use('/api/questionnaire', questionnaireRoutes)
app.use('/api/evaluations', evaluationRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
