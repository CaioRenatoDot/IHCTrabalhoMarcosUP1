const STORAGE_PREFIX = 'riskcare:latest-assessment'

export function getAssessmentStorageKey(userId) {
  return userId ? `${STORAGE_PREFIX}:${userId}` : STORAGE_PREFIX
}

export function readStoredAssessment(storageKey) {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.sessionStorage.getItem(storageKey)
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export function writeStoredAssessment(storageKey, assessment) {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(storageKey, JSON.stringify(assessment))
}
