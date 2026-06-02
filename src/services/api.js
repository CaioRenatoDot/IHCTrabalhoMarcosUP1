import { clearSession, getToken, saveSession } from './authStorage.js'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export class ApiError extends Error {
  constructor(message, status, details = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

function formatValidationDetails(details) {
  if (!Array.isArray(details) || details.length === 0) {
    return null
  }

  return details.map((item) => item.message).join(' ')
}

async function apiRequest(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  let payload = null

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearSession()
    }

    const validationMessage = formatValidationDetails(payload?.details)
    const message = validationMessage || payload?.error || 'Não foi possível concluir a requisição.'

    throw new ApiError(message, response.status, payload?.details ?? null)
  }

  return payload?.data ?? payload
}

export const authApi = {
  register(body) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
  login(body) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },
  profile() {
    return apiRequest('/auth/profile')
  },
  updateProfile(body) {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  },
}

export const questionnaireApi = {
  saveResponses(answers) {
    return apiRequest('/questionnaire/responses', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    })
  },
  listResponses() {
    return apiRequest('/questionnaire/responses')
  },
}

export const evaluationApi = {
  generate(payload) {
    return apiRequest('/evaluations', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  list() {
    return apiRequest('/evaluations')
  },
}

export { saveSession }
