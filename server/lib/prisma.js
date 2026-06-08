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

export function getPrisma() {
  if (!globalForPrisma.__riskcarePrisma) {
    globalForPrisma.__riskcarePrisma = createPrismaClient()
  }

  return globalForPrisma.__riskcarePrisma
}

