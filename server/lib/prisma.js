import prismaClientPkg from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const { PrismaClient } = prismaClientPkg

const globalForPrisma = globalThis

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  })

  return new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  })
}

export const prisma = globalForPrisma.__riskcarePrisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__riskcarePrisma = prisma
}

