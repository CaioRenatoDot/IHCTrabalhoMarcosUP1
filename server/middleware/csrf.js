import crypto from 'crypto'
import { env } from '../config/env.js'

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

export function issueCsrfToken(req, res) {
  const token = crypto.randomBytes(32).toString('hex')

  res.cookie(env.CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  return res.status(200).json({
    ok: true,
    csrfToken: token,
  })
}

export function verifyCsrfToken(req, res, next) {
  if (SAFE_METHODS.has(req.method)) {
    return next()
  }

  if (!req.path.startsWith('/auth')) {
    return next()
  }

  const cookieToken = req.cookies?.[env.CSRF_COOKIE_NAME]
  const headerToken = req.get('x-csrf-token')

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({
      ok: false,
      error: 'CSRF token invalid or missing',
    })
  }

  return next()
}
