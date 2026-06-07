import { config as loadEnv } from 'dotenv'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, env } from 'prisma/config'

const rootDir = dirname(fileURLToPath(import.meta.url))
loadEnv({ path: resolve(rootDir, 'server/.env') })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
    shadowDatabaseUrl: env('DIRECT_URL'),
  },
})
