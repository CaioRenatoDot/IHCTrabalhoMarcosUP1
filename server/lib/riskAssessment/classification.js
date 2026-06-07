import { CLASSIFICATION_THRESHOLDS } from './weights.js'

export function classifyRiskScore(score) {
  if (score <= CLASSIFICATION_THRESHOLDS.lowMax) {
    return 'baixo'
  }

  if (score <= CLASSIFICATION_THRESHOLDS.moderateMax) {
    return 'moderado'
  }

  return 'alto'
}

export function applyDiagnosisFloor(score, cancerDiagnosis) {
  if (cancerDiagnosis === 'Sim, câncer de mama') {
    return {
      adjustedScore: Math.max(score, 75),
      warning:
        'Diagnóstico prévio de câncer de mama informado: o resultado final deve ser tratado com atenção clínica reforçada.',
    }
  }

  if (cancerDiagnosis === 'Sim, outro tipo de câncer') {
    return {
      adjustedScore: Math.max(score, 55),
      warning:
        'Diagnóstico prévio de outro tipo de câncer informado: o resultado final deve ser tratado com atenção clínica reforçada.',
    }
  }

  return {
    adjustedScore: score,
    warning: null,
  }
}

export function classifyWithDiagnosisFloor(score, cancerDiagnosis) {
  const diagnosisFloor = applyDiagnosisFloor(score, cancerDiagnosis)

  return {
    score: diagnosisFloor.adjustedScore,
    classification: classifyRiskScore(diagnosisFloor.adjustedScore),
    warning: diagnosisFloor.warning,
  }
}
