import { useRef, useState } from 'react'

function SignupForm({ onSignup, onSignupSuccess }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [termsError, setTermsError] = useState('')
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextName = fullName.trim()
    const nextEmail = email.trim()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(nextEmail)

    setNameError('')
    setEmailError('')
    setPasswordError('')
    setTermsError('')
    setAuthError('')

    let hasError = false

    if (nextName.length < 3) {
      setNameError('Digite seu nome completo')
      nameInputRef.current?.focus()
      hasError = true
    }

    if (!validEmail) {
      setEmailError('Informe um e-mail válido')

      if (!hasError) {
        emailInputRef.current?.focus()
      }

      hasError = true
    }

    if (password.length < 6) {
      setPasswordError('Mínimo de 6 caracteres')

      if (!hasError) {
        passwordInputRef.current?.focus()
      }

      hasError = true
    }

    if (!acceptedTerms) {
      setTermsError('Aceite os termos para criar sua conta')
      hasError = true
    }

    if (hasError || typeof onSignup !== 'function') {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await onSignup({ fullName: nextName, email: nextEmail, password })

      if (result?.ok) {
        if (typeof onSignupSuccess === 'function') {
          onSignupSuccess(result)
        }
        return
      }

      setAuthError(result?.error ?? 'Não foi possível criar a conta. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="login-form signup-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <div className="field-group">
        <label htmlFor="signup-name">Nome completo</label>
        <input
          ref={nameInputRef}
          id="signup-name"
          type="text"
          placeholder="Seu nome completo"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value)
            if (nameError) setNameError('')
            if (authError) setAuthError('')
          }}
          className={nameError ? 'error' : ''}
          aria-invalid={nameError ? 'true' : 'false'}
          aria-describedby={nameError ? 'signup-name-error' : undefined}
          disabled={isSubmitting}
        />
        <p id="signup-name-error" className={`form-error${nameError ? ' show' : ''}`} role="alert">
          {nameError}
        </p>
      </div>

      <div className="field-group">
        <label htmlFor="signup-email">E-mail</label>
        <input
          ref={emailInputRef}
          id="signup-email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (emailError) setEmailError('')
            if (authError) setAuthError('')
          }}
          className={emailError ? 'error' : ''}
          aria-invalid={emailError ? 'true' : 'false'}
          aria-describedby={emailError ? 'signup-email-error' : undefined}
          disabled={isSubmitting}
        />
        <p id="signup-email-error" className={`form-error${emailError ? ' show' : ''}`} role="alert">
          {emailError}
        </p>
      </div>

      <div className="field-group">
        <label htmlFor="signup-password">Senha</label>
        <input
          ref={passwordInputRef}
          id="signup-password"
          type="password"
          placeholder="Crie uma senha"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            if (passwordError) setPasswordError('')
            if (authError) setAuthError('')
          }}
          className={passwordError ? 'error' : ''}
          aria-invalid={passwordError ? 'true' : 'false'}
          aria-describedby={passwordError ? 'signup-password-error' : undefined}
          disabled={isSubmitting}
        />
        <p id="signup-password-error" className={`form-error${passwordError ? ' show' : ''}`} role="alert">
          {passwordError}
        </p>
      </div>

      <div className="signup-terms">
        <label className="signup-terms__check" htmlFor="signup-terms">
          <input
            id="signup-terms"
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => {
              setAcceptedTerms(event.target.checked)
              if (termsError) setTermsError('')
              if (authError) setAuthError('')
            }}
            disabled={isSubmitting}
          />
          <span>Eu li e concordo</span>
        </label>

        <p className="signup-terms__text">
          com os{' '}
          <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer">
            Termos de uso
          </a>{' '}
          e com a{' '}
          <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
            Política de privacidade
          </a>{' '}
          do RiskCare.
        </p>
      </div>

      <p className={`form-error${termsError ? ' show' : ''}`} role="alert">
        {termsError}
      </p>

      <p className={`form-error login-error${authError ? ' show' : ''}`} role="alert">
        {authError}
      </p>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  )
}

export default SignupForm
