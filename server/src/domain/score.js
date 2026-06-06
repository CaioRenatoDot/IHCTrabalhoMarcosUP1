import { FIELD_MAPPING } from './fieldMapping.js'
import { classifyWithDiagnosisFloor } from './classification.js'
import { normalizeAssessmentPayload } from './normalize.js'
import { GROUP_FACTOR_WEIGHTS, GROUP_WEIGHTS } from './weights.js'

const GROUP_LABELS = {
  profile: 'Perfil',
  familyHistory: 'Histórico familiar e genético',
  symptomsExams: 'Sintomas e exames',
  hormonalReproductive: 'Hormonal e reprodutivo',
  lifestyle: 'Estilo de vida',
}

function roundToTwoDecimals(value) {
  return Number(value.toFixed(2))
}

function getImpactLabel(normalizedValue) {
  if (normalizedValue >= 0.67) {
    return 'alto'
  }

  if (normalizedValue >= 0.34) {
    return 'moderado'
  }

  return 'baixo'
}

function buildGroupScores(normalizedGroups) {
  return Object.fromEntries(
    Object.entries(normalizedGroups).map(([groupKey, groupValue]) => [
      groupKey,
      Math.round(groupValue * GROUP_WEIGHTS[groupKey]),
    ]),
  )
}

function buildFactorBreakdown(payload, normalizedFields) {
  const scoredFields = FIELD_MAPPING.filter((field) => field.includedInScore)

  return scoredFields
    .map((field) => {
      const groupWeight = GROUP_WEIGHTS[field.group]
      const factorWeight = GROUP_FACTOR_WEIGHTS[field.group][field.key]
      const normalizedValue = normalizedFields[field.key] ?? 0
      const contribution = normalizedValue * factorWeight * groupWeight

      return {
        key: field.key,
        label: field.label,
        group: field.group,
        groupLabel: GROUP_LABELS[field.group],
        originalValue: payload[field.key],
        normalizedValue: roundToTwoDecimals(normalizedValue),
        contribution: roundToTwoDecimals(contribution),
        impact: getImpactLabel(normalizedValue),
      }
    })
    .sort((left, right) => right.contribution - left.contribution)
}

function buildWarnings(classificationResult) {
  const warnings = ['Esta ferramenta nao realiza diagnostico medico.']

  if (classificationResult.warning) {
    warnings.unshift(classificationResult.warning)
  }

  return warnings
}

export function evaluateRiskAssessment(payload) {
  const { normalizedFields, normalizedGroups } = normalizeAssessmentPayload(payload)
  const rawScore = Object.entries(normalizedGroups).reduce((total, [groupKey, groupValue]) => {
    return total + groupValue * GROUP_WEIGHTS[groupKey]
  }, 0)

  const roundedRawScore = Math.round(rawScore)
  const classificationResult = classifyWithDiagnosisFloor(roundedRawScore, payload.cancerDiagnosis)
  const groupScores = buildGroupScores(normalizedGroups)
  const factorBreakdown = buildFactorBreakdown(payload, normalizedFields)

  return {
    status: 'accepted',
    message: 'Avaliacao processada com sucesso.',
    score: classificationResult.score,
    rawScore: roundedRawScore,
    classification: classificationResult.classification,
    groupScores,
    factorBreakdown,
    warnings: buildWarnings(classificationResult),
    sourcesUsed: ['INCA', 'SEER'],
    normalizedGroups: Object.fromEntries(
      Object.entries(normalizedGroups).map(([groupKey, groupValue]) => [
        groupKey,
        roundToTwoDecimals(groupValue),
      ]),
    ),
  }
}
