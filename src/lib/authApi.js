const DEFAULT_API_BASE_URL = 'http://localhost:3001'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL

let csrfTokenCache = null

async function fetchJson(path, options = {}) {
  const url = new URL(path, apiBaseUrl)
  const method = options.method ?? 'GET'
  const headers = new Headers(options.headers ?? {})

  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  if (method !== 'GET') {
    const csrfToken = await getCsrfToken()
    headers.set('x-csrf-token', csrfToken)
  }

  const response = await fetch(url, {
    method,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    credentials: 'include',
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Não foi possível concluir a autenticação')
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
    throw new Error('Não foi possível preparar a proteção da sessão')
  }

  csrfTokenCache = data.csrfToken
  return csrfTokenCache
}

export async function getAuthSession() {
  return fetchJson('/api/auth/session')
}

export async function loginWithBackend(payload) {
  return fetchJson('/api/auth/login', {
    method: 'POST',
    body: payload,
  })
}

export async function signupWithBackend(payload) {
  return fetchJson('/api/auth/signup', {
    method: 'POST',
    body: payload,
  })
}

export async function logoutWithBackend() {
  return fetchJson('/api/auth/logout', {
    method: 'POST',
  })
}

export async function getBackendHealth() {
  return fetchJson('/api/auth/health')
}
