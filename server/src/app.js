import express from 'express'
import healthRouter from './routes/health.js'

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(express.json())
app.use('/api', healthRouter)

app.listen(port, () => {
  console.log(`Risk engine API running on http://localhost:${port}`)
})
