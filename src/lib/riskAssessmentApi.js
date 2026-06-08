const apiBaseUrl = import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL?.trim() || '' : ''
let csrfTokenCache = null

async function fetchJson(path, options = {}) {
  const url = apiBaseUrl ? new URL(path, apiBaseUrl) : path
  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    credentials: 'include',
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Não foi possível concluir a avaliação')
  }

  return data
}

async function getCsrfToken() {
  if (csrfTokenCache) {
    return csrfTokenCache
  }

  const url = apiBaseUrl ? new URL('/api/security/csrf', apiBaseUrl) : '/api/security/csrf'
  const response = await fetch(url, {
    credentials: 'include',
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok || !data.csrfToken) {
    throw new Error('Não foi possível preparar a proteção da avaliação')
  }

  csrfTokenCache = data.csrfToken
  return csrfTokenCache
}

export async function submitRiskAssessment(payload) {
  const csrfToken = await getCsrfToken()

  return fetchJson('/api/risk-assessment', {
    method: 'POST',
    body: payload,
    headers: {
      'x-csrf-token': csrfToken,
    },
  })
}

export async function getLatestRiskAssessment() {
  return fetchJson('/api/risk-assessment/latest')
}
