export const FIELD_MAPPING = [
  {
    key: 'fullName',
    label: 'Nome completo',
    group: 'profile',
    step: 'Perfil',
    valueType: 'string',
    required: true,
    includedInScore: false,
  },
  {
    key: 'age',
    label: 'Idade',
    group: 'profile',
    step: 'Perfil',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'state',
    label: 'Estado (UF)',
    group: 'profile',
    step: 'Perfil',
    valueType: 'string',
    required: true,
    includedInScore: false,
  },
  {
    key: 'cancerDiagnosis',
    label: 'Diagnóstico de câncer',
    group: 'profile',
    step: 'Perfil',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'familyBreastCancer',
    label: 'Histórico familiar de câncer de mama',
    group: 'familyHistory',
    step: 'Histórico',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'brcaTest',
    label: 'Histórico de BRCA1 ou BRCA2',
    group: 'familyHistory',
    step: 'Histórico',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'familyOvaryCancer',
    label: 'Histórico familiar de câncer de ovário ou endométrio',
    group: 'familyHistory',
    step: 'Histórico',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'symptoms',
    label: 'Sintomas observados',
    group: 'symptomsExams',
    step: 'Sintomas',
    valueType: 'array',
    required: true,
    includedInScore: true,
  },
  {
    key: 'mammogram',
    label: 'Última mamografia',
    group: 'symptomsExams',
    step: 'Sintomas',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'breastPain',
    label: 'Dor ou desconforto mamário',
    group: 'symptomsExams',
    step: 'Sintomas',
    valueType: 'number',
    required: true,
    includedInScore: true,
  },
  {
    key: 'hormonalContraceptive',
    label: 'Uso de anticoncepcional hormonal',
    group: 'hormonalReproductive',
    step: 'Hormonal',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'hormoneReplacement',
    label: 'Terapia de reposição hormonal',
    group: 'hormonalReproductive',
    step: 'Hormonal',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'menarche',
    label: 'Menarca',
    group: 'hormonalReproductive',
    step: 'Hormonal',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'menopause',
    label: 'Menopausa',
    group: 'hormonalReproductive',
    step: 'Hormonal',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'breastfed',
    label: 'Amamentação por mais de 6 meses',
    group: 'hormonalReproductive',
    step: 'Hormonal',
    valueType: 'string',
    required: false,
    includedInScore: true,
  },
  {
    key: 'physicalActivity',
    label: 'Frequência de atividade física',
    group: 'lifestyle',
    step: 'Estilo de vida',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'alcohol',
    label: 'Consumo de bebida alcoólica',
    group: 'lifestyle',
    step: 'Estilo de vida',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'smoking',
    label: 'Tabagismo',
    group: 'lifestyle',
    step: 'Estilo de vida',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
  {
    key: 'diet',
    label: 'Avaliação da alimentação',
    group: 'lifestyle',
    step: 'Estilo de vida',
    valueType: 'number',
    required: true,
    includedInScore: true,
  },
  {
    key: 'bmi',
    label: 'Índice de massa corporal aproximado',
    group: 'lifestyle',
    step: 'Estilo de vida',
    valueType: 'string',
    required: true,
    includedInScore: true,
  },
]

export function getAllMappedFieldKeys() {
  return FIELD_MAPPING.map((field) => field.key)
}

export function getMappedFieldsByType(valueType) {
  return FIELD_MAPPING.filter((field) => field.valueType === valueType)
}

export function getMappedFieldsByRequirement(required) {
  return FIELD_MAPPING.filter((field) => field.required === required)
}

export function getScoredFields() {
  return FIELD_MAPPING.filter((field) => field.includedInScore)
}

export function getMetadataFields() {
  return FIELD_MAPPING.filter((field) => !field.includedInScore)
}

export function getFieldGroupSummary() {
  return FIELD_MAPPING.reduce((summary, field) => {
    if (!summary[field.group]) {
      summary[field.group] = {
        step: field.step,
        totalFields: 0,
        scoredFields: 0,
        metadataFields: 0,
      }
    }

    summary[field.group].totalFields += 1

    if (field.includedInScore) {
      summary[field.group].scoredFields += 1
    } else {
      summary[field.group].metadataFields += 1
    }

    return summary
  }, {})
}

export function findUnmappedFields(fieldKeys) {
  const mappedFieldKeys = new Set(getAllMappedFieldKeys())
  return fieldKeys.filter((fieldKey) => !mappedFieldKeys.has(fieldKey))
}
