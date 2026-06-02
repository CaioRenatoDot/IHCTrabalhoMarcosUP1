const AGE_SCORES = {
  under_40: 0,
  '40_49': 8,
  '50_59': 15,
  '60_plus': 22,
}

const BOOLEAN_RISK_QUESTIONS = {
  historico_familiar: { label: 'Histórico familiar de câncer de mama', points: 18 },
  historico_pessoal: { label: 'Histórico pessoal de câncer de mama', points: 25 },
  nodulo_mama: { label: 'Presença de nódulo na mama', points: 20 },
  alteracao_pele: { label: 'Alteração na pele da mama', points: 12 },
  secrecao_mamilar: { label: 'Secreção mamilar incomum', points: 10 },
  terapia_hormonal: { label: 'Uso prolongado de terapia hormonal', points: 8 },
  menarca_precoce: { label: 'Menarca antes dos 12 anos', points: 5 },
  menopausa_tardia: { label: 'Menopausa após os 55 anos', points: 6 },
  sem_filhos: { label: 'Nunca ter tido filhos', points: 4 },
  sedentarismo: { label: 'Baixa atividade física regular', points: 4 },
  tabagismo: { label: 'Tabagismo atual ou recente', points: 6 },
  consumo_alcool: { label: 'Consumo frequente de álcool', points: 5 },
}

function toBoolean(value) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()

    if (['true', '1', 'sim', 'yes'].includes(normalized)) {
      return true
    }

    if (['false', '0', 'nao', 'não', 'no'].includes(normalized)) {
      return false
    }
  }

  return Boolean(value)
}

function scoreAnswer(questionId, value) {
  if (questionId === 'idade' && typeof value === 'string') {
    return AGE_SCORES[value] ?? 0
  }

  const riskQuestion = BOOLEAN_RISK_QUESTIONS[questionId]

  if (riskQuestion && toBoolean(value)) {
    return riskQuestion.points
  }

  return 0
}

function resolveRiskLevel(score) {
  if (score >= 55) {
    return 'alto'
  }

  if (score >= 30) {
    return 'moderado'
  }

  return 'baixo'
}

function buildSummary(riskLevel, score) {
  const messages = {
    baixo:
      'Com base nas respostas, o perfil estimado é de risco baixo. Mantenha hábitos saudáveis e acompanhamento preventivo regular.',
    moderado:
      'Com base nas respostas, o perfil estimado é de risco moderado. Considere conversar com um profissional de saúde sobre avaliação clínica.',
    alto:
      'Com base nas respostas, o perfil estimado é de risco elevado. Procure orientação médica para avaliação presencial o quanto antes.',
  }

  return `${messages[riskLevel]} (pontuação: ${score}/100). Esta estimativa é informativa e não substitui diagnóstico médico.`
}

export function generateEvaluationFromAnswers(answers) {
  const breakdown = answers.map((answer) => {
    const points = scoreAnswer(answer.questionId, answer.value)

    return {
      questionId: answer.questionId,
      value: answer.value,
      points,
    }
  })

  const riskScore = Math.min(100, breakdown.reduce((total, item) => total + item.points, 0))
  const riskLevel = resolveRiskLevel(riskScore)
  const summary = buildSummary(riskLevel, riskScore)

  const flaggedFactors = breakdown
    .filter((item) => item.points > 0)
    .map((item) => ({
      questionId: item.questionId,
      label: BOOLEAN_RISK_QUESTIONS[item.questionId]?.label ?? item.questionId,
      points: item.points,
    }))

  return {
    riskScore,
    riskLevel,
    summary,
    details: {
      breakdown,
      flaggedFactors,
      disclaimer:
        'Ferramenta educativa de triagem. Não realiza diagnóstico. Em caso de sintomas, busque atendimento profissional.',
    },
  }
}
