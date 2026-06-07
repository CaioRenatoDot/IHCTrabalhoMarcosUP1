/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  getAuthSession,
  loginWithBackend,
  logoutWithBackend,
  signupWithBackend,
} from '../lib/authApi.js'

const AuthContext = createContext(null)

function normalizeAuthError(error) {
  const message = typeof error === 'string' ? error : error?.message ?? ''
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('invalid') || lowerMessage.includes('inválid')) {
    return 'E-mail ou senha inválidos'
  }

  if (lowerMessage.includes('already') || lowerMessage.includes('cadastrado')) {
    return 'Este e-mail já está cadastrado'
  }

  if (lowerMessage.includes('email')) {
    return 'Verifique o e-mail informado'
  }

  if (lowerMessage.includes('password') || lowerMessage.includes('senha')) {
    return 'A senha não atendeu aos requisitos'
  }

  if (lowerMessage.includes('csrf')) {
    return 'Não foi possível validar a sessão. Recarregue a página e tente novamente'
  }

  if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
    return 'Não foi possível conectar ao backend'
  }

  return 'Não foi possível concluir a autenticação. Tente novamente'
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadSession = async () => {
      try {
        const data = await getAuthSession()

        if (!isMounted) {
          return
        }

        setSession(data.session ?? null)
      } catch {
        if (isMounted) {
          setSession(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadSession()

    return () => {
      isMounted = false
    }
  }, [])

  const value = useMemo(
    () => ({
      isConfigured: true,
      loading,
      session,
      user: session?.user ?? null,
      signIn: async ({ email, password }) => {
        try {
          const data = await loginWithBackend({
            email,
            password,
          })

          setSession(data.session ?? null)

          return {
            ok: true,
            session: data.session ?? null,
            user: data.user ?? data.session?.user ?? null,
          }
        } catch (error) {
          return { ok: false, error: normalizeAuthError(error) }
        }
      },
      signOut: async () => {
        try {
          await logoutWithBackend()
          setSession(null)

          return { ok: true }
        } catch (error) {
          return { ok: false, error: normalizeAuthError(error) }
        }
      },
      signUp: async ({ fullName, email, password }) => {
        try {
          const data = await signupWithBackend({
            fullName,
            email,
            password,
            acceptedTerms: true,
          })

          setSession(data.session ?? null)

          return {
            ok: true,
            requiresConfirmation: Boolean(data.requiresConfirmation),
            session: data.session ?? null,
            user: data.user ?? data.session?.user ?? null,
          }
        } catch (error) {
          return { ok: false, error: normalizeAuthError(error) }
        }
      },
    }),
    [loading, session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}
