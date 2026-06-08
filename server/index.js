import { createApp } from './app.js'
import { env } from './config/env.js'

const app = createApp()
const server = app.listen(env.PORT, () => {
  console.log(`RiskCare backend running on http://localhost:${env.PORT}`)
})

process.stdin.resume()

function shutdown(signal) {
  console.log(`RiskCare backend received ${signal}, shutting down...`)
  server.close(() => {
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('exit', (code) => {
  if (code !== 0) {
    console.log(`RiskCare backend exited with code ${code}`)
  }
})
