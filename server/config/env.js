import { config as loadEnv } from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const serverDir = dirname(fileURLToPath(import.meta.url))
loadEnv({ path: resolve(serverDir, '../.env') })

const DEFAULT_FRONTEND_ORIGIN = 'http://localhost:5173'
const DEFAULT_PORT = 3001

function readEnv(key, fallback = '') {
  const value = process.env[key]
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback
}

export const env = {
  NODE_ENV: readEnv('NODE_ENV', 'development'),
  PORT: Number(readEnv('PORT', String(DEFAULT_PORT))),
  FRONTEND_ORIGIN: readEnv('FRONTEND_ORIGIN', DEFAULT_FRONTEND_ORIGIN),
  SUPABASE_URL: readEnv('SUPABASE_URL'),
  SUPABASE_PUBLISHABLE_KEY: readEnv('SUPABASE_PUBLISHABLE_KEY'),
  SESSION_COOKIE_NAME: readEnv('SESSION_COOKIE_NAME', 'riskcare-auth'),
  CSRF_COOKIE_NAME: readEnv('CSRF_COOKIE_NAME', 'riskcare-csrf'),
  RATE_LIMIT_WINDOW_MS: Number(readEnv('RATE_LIMIT_WINDOW_MS', String(15 * 60 * 1000))),
  RATE_LIMIT_MAX: Number(readEnv('RATE_LIMIT_MAX', '25')),
}

export const hasSupabaseConfig = Boolean(env.SUPABASE_URL && env.SUPABASE_PUBLISHABLE_KEY)
