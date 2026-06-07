const DEFAULT_API_BASE_URL = 'http://localhost:3001'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL
let csrfTokenCache = null

async function fetchJson(path, options = {}) {
  const url = new URL(path, apiBaseUrl)
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

  const url = new URL('/api/security/csrf', apiBaseUrl)
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
