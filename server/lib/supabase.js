import { createServerClient } from '@supabase/ssr'
import { env, hasSupabaseConfig } from '../config/env.js'

function mapCookiesFromRequest(req) {
  return Object.entries(req.cookies ?? {}).map(([name, value]) => ({
    name,
    value: String(value),
  }))
}

export function createSupabaseServerClient(req, res) {
  if (!hasSupabaseConfig) {
    throw new Error('Supabase not configured')
  }

  return createServerClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return mapCookiesFromRequest(req)
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookie(name, value, {
            ...options,
            httpOnly: options?.httpOnly ?? true,
            secure: options?.secure ?? env.NODE_ENV === 'production',
            sameSite: options?.sameSite ?? 'lax',
            path: options?.path ?? '/',
          })
        })
      },
    },
  })
}
