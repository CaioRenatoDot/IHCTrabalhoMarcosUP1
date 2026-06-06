import {
  findUnmappedFields,
  getAllMappedFieldKeys,
  getFieldGroupSummary,
  getMappedFieldsByRequirement,
  getMappedFieldsByType,
  getMetadataFields,
  getScoredFields,
} from './fieldMapping.js'

const REQUIRED_STRING_FIELDS = getMappedFieldsByType('string').filter((field) => field.required)
const OPTIONAL_STRING_FIELDS = getMappedFieldsByType('string').filter((field) => !field.required)
const NUMBER_FIELDS = getMappedFieldsByType('number')
const ARRAY_FIELDS = getMappedFieldsByType('array')
const ALL_FIELDS = getAllMappedFieldKeys()

function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function isValidScoreValue(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 10
}

export function validateRiskAssessmentPayload(payload) {
  const errors = {}

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {
      isValid: false,
      errors: {
        payload: 'O corpo da requisição deve ser um objeto JSON.',
      },
    }
  }

  for (const field of REQUIRED_STRING_FIELDS) {
    if (!hasOwnProperty(payload, field.key)) {
      errors[field.key] = 'Campo obrigatório ausente.'
      continue
    }

    if (!isNonEmptyString(payload[field.key])) {
      errors[field.key] = 'Campo obrigatório inválido.'
    }
  }

  for (const field of OPTIONAL_STRING_FIELDS) {
    if (!hasOwnProperty(payload, field.key)) {
      errors[field.key] = 'Campo esperado ausente.'
      continue
    }

    if (typeof payload[field.key] !== 'string') {
      errors[field.key] = 'Campo opcional inválido.'
    }
  }

  for (const field of NUMBER_FIELDS) {
    if (!hasOwnProperty(payload, field.key)) {
      errors[field.key] = 'Campo obrigatório ausente.'
      continue
    }

    if (!isValidScoreValue(payload[field.key])) {
      errors[field.key] = 'Campo numérico inválido.'
    }
  }

  for (const field of ARRAY_FIELDS) {
    if (!hasOwnProperty(payload, field.key)) {
      errors[field.key] = 'Campo obrigatório ausente.'
      continue
    }

    if (!Array.isArray(payload[field.key]) || payload[field.key].length === 0) {
      errors[field.key] = 'Campo de lista inválido.'
      continue
    }

    if (!payload[field.key].every(isNonEmptyString)) {
      errors[field.key] = 'Todos os itens da lista devem ser textos válidos.'
    }
  }

  const extraFields = findUnmappedFields(Object.keys(payload))

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    extraFields,
  }
}

export function buildTemporaryAssessmentResponse() {
  return {
    status: 'accepted',
    message: 'Payload validado com sucesso. O motor de risco ainda nao foi implementado.',
    score: null,
    classification: null,
    groupScores: {
      profile: null,
      familyHistory: null,
      symptomsExams: null,
      hormonalReproductive: null,
      lifestyle: null,
    },
    factorBreakdown: [],
    warnings: [
      'Resposta temporaria: a logica de avaliacao sera implementada nas proximas etapas.',
      'Esta ferramenta nao realiza diagnostico medico.',
    ],
    sourcesUsed: ['INCA', 'SEER'],
    mappingSummary: {
      totalFields: ALL_FIELDS.length,
      scoredFields: getScoredFields().map((field) => field.key),
      metadataFields: getMetadataFields().map((field) => field.key),
      requiredFields: getMappedFieldsByRequirement(true).map((field) => field.key),
      groups: getFieldGroupSummary(),
    },
  }
}
