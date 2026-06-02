import { useRef, useState } from 'react'
import { ApiError, authApi, saveSession } from '../../services/api.js'

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextEmail = email.trim()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(nextEmail)
    let hasError = false

    setEmailError('')
    setPasswordError('')
    setSubmitError('')

    if (!validEmail) {
      setEmailError('Informe um e-mail válido')
      emailInputRef.current?.focus()
      hasError = true
    }

    if (password.trim().length === 0) {
      setPasswordError('Digite sua senha')

      if (!hasError) {
        passwordInputRef.current?.focus()
      }

      hasError = true
    }

    if (hasError) {
      return
    }

    setIsSubmitting(true)

    try {
      const data = await authApi.login({
        email: nextEmail,
        password,
      })

      saveSession(data)
      onLoginSuccess()
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : 'Não foi possível entrar na plataforma.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <div className="field-group">
        <label htmlFor="login-email">E-mail</label>
        <input
          ref={emailInputRef}
          id="login-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (emailError) setEmailError('')
          }}
          className={emailError ? 'error' : ''}
          aria-invalid={emailError ? 'true' : 'false'}
          aria-describedby={emailError ? 'login-email-error' : undefined}
        />
        <p id="login-email-error" className={`form-error${emailError ? ' show' : ''}`} role="alert">
          {emailError}
        </p>
      </div>

      <div className="field-group">
        <label htmlFor="login-password">Senha</label>
        <input
          ref={passwordInputRef}
          id="login-password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            if (passwordError) setPasswordError('')
          }}
          className={passwordError ? 'error' : ''}
          aria-invalid={passwordError ? 'true' : 'false'}
          aria-describedby={passwordError ? 'login-password-error' : undefined}
        />
        <p id="login-password-error" className={`form-error${passwordError ? ' show' : ''}`} role="alert">
          {passwordError}
        </p>
      </div>

      {submitError && (
        <p className="form-error show" role="alert">
          {submitError}
        </p>
      )}

      <p className="forgot-password">
        Esqueceu sua senha? <a href="#">Clique aqui</a>
      </p>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar na plataforma'}
      </button>
    </form>
  )
}

export default LoginForm
