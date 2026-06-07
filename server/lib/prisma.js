import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

function createPrismaClient() {
  return new PrismaClient({
    log: ['error', 'warn'],
  })
}

export const prisma = globalForPrisma.__riskcarePrisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__riskcarePrisma = prisma
}

