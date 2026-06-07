const DEFAULT_API_BASE_URL = 'http://localhost:3001'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL

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

export async function submitRiskAssessment(payload) {
  return fetchJson('/api/risk-assessment', {
    method: 'POST',
    body: payload,
  })
}
