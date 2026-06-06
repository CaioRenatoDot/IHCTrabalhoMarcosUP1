const authEvents = []
const MAX_EVENTS = 100

function normalizeEventType(eventType) {
  return String(eventType ?? 'unknown').trim().toLowerCase().replace(/\s+/g, '_')
}

export function recordAuthEvent(eventType, req, details = {}) {
  const event = {
    eventType: normalizeEventType(eventType),
    createdAt: new Date().toISOString(),
    ip: req.ip ?? req.headers['x-forwarded-for'] ?? 'unknown',
    userAgent: req.get('user-agent') ?? 'unknown',
    details,
  }

  authEvents.unshift(event)

  if (authEvents.length > MAX_EVENTS) {
    authEvents.length = MAX_EVENTS
  }

  console.info('[auth-event]', JSON.stringify(event))

  return event
}

export function getAuthDiagnostics() {
  return {
    totalEvents: authEvents.length,
    recentEvents: authEvents.slice(0, 10),
  }
}
