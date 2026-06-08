import { getPrisma } from './prisma.js'

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

export async function persistAuthEvent({ userId, eventType, req, details = {} }) {
  if (!userId) {
    return {
      saved: false,
      reason: 'missing-user',
    }
  }

  const prisma = getPrisma()
  const event = recordAuthEvent(eventType, req, {
    ...details,
    userId,
  })

  await prisma.authEvent.create({
    data: {
      userId,
      eventType: event.eventType,
      ip: event.ip,
      userAgent: event.userAgent,
      detailsJson: {
        ...details,
        userId,
      },
    },
  })

  return {
    saved: true,
    event,
  }
}

export function getAuthDiagnostics() {
  return {
    totalEvents: authEvents.length,
    recentEvents: authEvents.slice(0, 10),
  }
}
