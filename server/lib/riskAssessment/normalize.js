import { GROUP_FACTOR_WEIGHTS } from './weights.js'

const NO_SYMPTOMS_LABEL = 'Nenhuma das opções acima'
const RED_FLAG_SYMPTOMS = ['Nódulo ou caroço palpável', 'Saída de líquido pelo mamilo']

function clamp01(value) {
  return Math.min(1, Math.max(0, value))
}

function canonicalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function toLooseText(value) {
  return canonicalizeText(value)
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getFactorFromMap(value, factorByValue) {
  return factorByValue[canonicalizeText(value)] ?? 0
}

function normalizeScaleZeroToTen(value) {
  return clamp01(value / 10)
}

function parseAge(value) {
  const age = Number.parseInt(String(value), 10)
  return Number.isFinite(age) ? age : null
}

function normalizeAge(value) {
  const age = parseAge(value)

  if (age === null) {
    return 0
  }

  if (age < 35) {
    return 0.15
  }

  if (age <= 44) {
    return 0.35
  }

  if (age <= 54) {
    return 0.65
  }

  return 1
}

function normalizeCancerDiagnosis(value) {
  const normalizedValue = toLooseText(value)

  if (normalizedValue.includes('cancer de mama')) {
    return 1
  }

  if (normalizedValue.includes('outro tipo') || normalizedValue.includes('outro')) {
    return 0.7
  }

  if (normalizedValue.startsWith('n')) {
    return 0
  }

  return 0
}

function normalizeFamilyBreastCancer(value) {
  const normalizedValue = toLooseText(value)

  if (normalizedValue.includes('mais de um')) {
    return 1
  }

  if (normalizedValue.includes('1') && normalizedValue.includes('grau')) {
    return 0.75
  }

  if (normalizedValue.includes('2') && normalizedValue.includes('grau')) {
    return 0.45
  }

  if (normalizedValue.includes('sei') || normalizedValue.includes('informacao')) {
    return 0.35
  }

  if (normalizedValue.startsWith('n')) {
    return 0
  }

  return 0
}

function normalizeBrcaTest(value) {
  const normalizedValue = toLooseText(value)

  if (normalizedValue === 'sim' || normalizedValue.startsWith('sim ')) {
    return 1
  }

  if (normalizedValue.includes('que eu saiba')) {
    return 0
  }

  if (normalizedValue.includes('sei')) {
    return 0.4
  }

  return 0
}

function normalizeFamilyOvaryCancer(value) {
  const normalizedValue = toLooseText(value)

  if (normalizedValue === 'sim' || normalizedValue.startsWith('sim ')) {
    return 0.7
  }

  if (normalizedValue.includes('sei')) {
    return 0.3
  }

  if (normalizedValue.startsWith('n')) {
    return 0
  }

  return 0
}

function normalizeSymptoms(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return 0
  }

  const canonicalNoSymptomsLabel = canonicalizeText(NO_SYMPTOMS_LABEL)
  const canonicalRedFlagSymptoms = RED_FLAG_SYMPTOMS.map(canonicalizeText)
  const canonicalValues = value.map(canonicalizeText)

  if (canonicalValues.length === 1 && canonicalValues[0] === canonicalNoSymptomsLabel) {
    return 0
  }

  const activeSymptoms = canonicalValues.filter((item) => item !== canonicalNoSymptomsLabel)
  const baseFactor = activeSymptoms.length * 0.2
  const hasRedFlag = activeSymptoms.some((item) => canonicalRedFlagSymptoms.includes(item))

  return clamp01(baseFactor + (hasRedFlag ? 0.2 : 0))
}

function normalizeMammogram(value) {
  const factorByValue = {
    'menos de 1 ano': 0,
    'entre 1 e 2 anos': 0.35,
    'mais de 2 anos': 0.7,
    'nunca realizei': 1,
  }

  return getFactorFromMap(value, factorByValue)
}

function normalizeHormonalContraceptive(value) {
  const normalizedValue = toLooseText(value)

  if (normalizedValue.includes('5 anos ou mais') || normalizedValue.includes('ha 5 anos')) {
    return 0.7
  }

  if (normalizedValue.includes('menos de 5 anos')) {
    return 0.4
  }

  if (normalizedValue.includes('nunca')) {
    return 0
  }

  return 0
}

function normalizeHormoneReplacement(value) {
  const normalizedValue = toLooseText(value)

  if (normalizedValue.includes('5 anos ou mais') && normalizedValue.includes('sim')) {
    return 1
  }

  if (normalizedValue.includes('menos de 5 anos') && normalizedValue.includes('sim')) {
    return 0.55
  }

  if (normalizedValue.includes('sei')) {
    return 0.4
  }

  if (normalizedValue.startsWith('n')) {
    return 0
  }

  return 0
}

function normalizeMenarche(value) {
  const factorByValue = {
    'antes dos 12 anos': 1,
    'entre 12 e 14 anos': 0.4,
    'apos os 14 anos': 0.2,
  }

  return getFactorFromMap(value, factorByValue)
}

function normalizeMenopause(value) {
  const factorByValue = {
    'ainda nao tive': 0.3,
    'antes dos 50 anos': 0.4,
    'apos os 50 anos': 0.8,
  }

  return getFactorFromMap(value, factorByValue)
}

function normalizeBreastfed(value) {
  const normalizedValue = toLooseText(value)

  if (!normalizedValue) {
    return 0.15
  }

  if (normalizedValue.includes('nunca tive filhos')) {
    return 0.15
  }

  if (normalizedValue.startsWith('sim')) {
    return 0
  }

  if (normalizedValue.startsWith('n')) {
    return 0.45
  }

  return 0.15
}

function normalizePhysicalActivity(value) {
  const factorByValue = {
    'raramente ou nunca': 1,
    '1 a 2 vezes por semana': 0.5,
    '3 ou mais vezes por semana': 0.1,
  }

  return getFactorFromMap(value, factorByValue)
}

function normalizeAlcohol(value) {
  const factorByValue = {
    'nao bebo': 0,
    'ocasionalmente (menos de 1x/semana)': 0.25,
    'regularmente (1 a 3x/semana)': 0.6,
    diariamente: 1,
  }

  return getFactorFromMap(value, factorByValue)
}

function normalizeSmoking(value) {
  const factorByValue = {
    'nao, nunca': 0,
    'ex-fumante': 0.45,
    'sim, atualmente': 1,
  }

  return getFactorFromMap(value, factorByValue)
}

function normalizeDiet(value) {
  return clamp01((10 - value) / 10)
}

function normalizeBmi(value) {
  const factorByValue = {
    '18,5 - 24,9 (peso normal)': 0,
    'abaixo de 18,5 (abaixo do peso)': 0.25,
    '25 - 29,9 (sobrepeso)': 0.6,
    'acima de 30 (obesidade)': 1,
  }

  return getFactorFromMap(value, factorByValue)
}

const FIELD_NORMALIZERS = {
  age: normalizeAge,
  cancerDiagnosis: normalizeCancerDiagnosis,
  familyBreastCancer: normalizeFamilyBreastCancer,
  brcaTest: normalizeBrcaTest,
  familyOvaryCancer: normalizeFamilyOvaryCancer,
  symptoms: normalizeSymptoms,
  mammogram: normalizeMammogram,
  breastPain: normalizeScaleZeroToTen,
  hormonalContraceptive: normalizeHormonalContraceptive,
  hormoneReplacement: normalizeHormoneReplacement,
  menarche: normalizeMenarche,
  menopause: normalizeMenopause,
  breastfed: normalizeBreastfed,
  physicalActivity: normalizePhysicalActivity,
  alcohol: normalizeAlcohol,
  smoking: normalizeSmoking,
  diet: normalizeDiet,
  bmi: normalizeBmi,
}

function buildWeightedGroupScore(normalizedFields, fieldWeights) {
  return Object.entries(fieldWeights).reduce((total, [fieldKey, fieldWeight]) => {
    return total + (normalizedFields[fieldKey] ?? 0) * fieldWeight
  }, 0)
}

export function normalizeAssessmentPayload(payload) {
  const normalizedFields = Object.fromEntries(
    Object.entries(FIELD_NORMALIZERS).map(([fieldKey, normalizer]) => [
      fieldKey,
      clamp01(normalizer(payload[fieldKey])),
    ]),
  )

  const normalizedGroups = Object.fromEntries(
    Object.entries(GROUP_FACTOR_WEIGHTS).map(([groupKey, fieldWeights]) => [
      groupKey,
      clamp01(buildWeightedGroupScore(normalizedFields, fieldWeights)),
    ]),
  )

  return {
    normalizedFields,
    normalizedGroups,
  }
}
