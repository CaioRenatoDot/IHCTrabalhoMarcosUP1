import '../server/config/env.js'
import prismaClientPkg from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import {
  DATASET_FEATURE_MAPPINGS,
  DATASET_REFERENCES,
  RISK_MODEL_VERSIONS,
  assertCatalogCoverage,
  getCatalogCoverageReport,
} from '../server/lib/catalog/catalogSeedData.js'
import { FIELD_MAPPING } from '../server/lib/riskAssessment/fieldMapping.js'

const { PrismaClient } = prismaClientPkg

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  })

  return new PrismaClient({
    adapter,
    log: ['warn', 'error'],
  })
}

async function main() {
  assertCatalogCoverage(FIELD_MAPPING.map((field) => field.key))

  const prisma = createPrismaClient()

  try {
    const referenceRecords = await prisma.$transaction(async (tx) => {
      const records = []

      for (const reference of DATASET_REFERENCES) {
        const record = await tx.datasetReference.upsert({
          where: { slug: reference.slug },
          create: reference,
          update: reference,
        })

        records.push(record)
      }

      await tx.datasetFeatureMapping.deleteMany({})

      const referenceBySlug = new Map(records.map((record) => [record.slug, record.id]))
      const featureMappings = DATASET_FEATURE_MAPPINGS.map((mapping) => {
        const datasetReferenceId = referenceBySlug.get(mapping.datasetReferenceSlug)

        if (!datasetReferenceId) {
          throw new Error(`Missing dataset reference for slug: ${mapping.datasetReferenceSlug}`)
        }

        const { datasetReferenceSlug, ...data } = mapping
        return {
          ...data,
          datasetReferenceId,
        }
      })

      await tx.datasetFeatureMapping.createMany({
        data: featureMappings,
      })

      for (const version of RISK_MODEL_VERSIONS) {
        await tx.riskModelVersion.upsert({
          where: { version: version.version },
          create: version,
          update: version,
        })
      }

      return records
    }, {
      timeout: 60000,
      maxWait: 10000,
    })

    console.log(
      JSON.stringify(
        {
          seeded: true,
          datasetReferences: referenceRecords.length,
          featureMappings: DATASET_FEATURE_MAPPINGS.length,
          modelVersions: RISK_MODEL_VERSIONS.length,
          coverage: getCatalogCoverageReport(),
        },
        null,
        2,
      ),
    )
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(async (error) => {
  console.error(error)
  process.exitCode = 1
})
