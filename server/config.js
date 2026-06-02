import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const config = {
  port: Number(process.env.PORT) || 3001,
  jwtSecret: process.env.JWT_SECRET || 'riskcare-dev-secret-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 10,
  dbPath: process.env.DB_PATH || path.join(__dirname, 'data', 'riskcare.db'),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}
