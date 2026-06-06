/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'

const AuthContext = createContext(null)

function formatAuthError(error) {
  const message = error?.message?.toLowerCase() ?? ''

  if (message.includes('invalid login credentials')) {
    return 'E-mail ou senha inválidos'
  }

  if (message.includes('user already registered')) {
    return 'Este e-mail já está cadastrado'
  }

  if (message.includes('email')) {
    return 'Verifique o e-mail informado'
  }

  if (message.includes('password')) {
    return 'A senha não atendeu aos requisitos'
  }

  if (message.includes('network')) {
    return 'Não foi possível conectar ao Supabase'
  }

  return 'Não foi possível concluir a autenticação. Tente novamente'
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(Boolean(isSupabaseConfigured))

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return undefined
    }

    let isMounted = true

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (!isMounted) {
        return
      }

      if (!error) {
        setSession(data.session ?? null)
      }

      setLoading(false)
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) {
        return
      }

      setSession(nextSession ?? null)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      isConfigured: isSupabaseConfigured,
      loading,
      session,
      user: session?.user ?? null,
      signIn: async ({ email, password }) => {
        if (!supabase) {
          return { ok: false, error: 'Configure o Supabase no arquivo .env antes de entrar' }
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

        if (error) {
          return { ok: false, error: formatAuthError(error) }
        }

        setSession(data.session ?? null)

        return {
          ok: true,
          session: data.session ?? null,
          user: data.user ?? data.session?.user ?? null,
        }
      },
      signOut: async () => {
        if (!supabase) {
          return { ok: false, error: 'Configure o Supabase no arquivo .env antes de sair' }
        }

        const { error } = await supabase.auth.signOut()

        if (error) {
          return { ok: false, error: formatAuthError(error) }
        }

        setSession(null)

        return { ok: true }
      },
      signUp: async ({ fullName, email, password }) => {
        if (!supabase) {
          return { ok: false, error: 'Configure o Supabase no arquivo .env antes de criar a conta' }
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        })

        if (error) {
          return { ok: false, error: formatAuthError(error) }
        }

        setSession(data.session ?? null)

        return {
          ok: true,
          requiresConfirmation: !data.session,
          session: data.session ?? null,
          user: data.user ?? data.session?.user ?? null,
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
