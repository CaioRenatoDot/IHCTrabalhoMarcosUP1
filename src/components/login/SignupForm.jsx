import { useRef, useState } from 'react'
import { ApiError, authApi, saveSession } from '../../services/api.js'

function SignupForm({ onSignupSuccess }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [termsError, setTermsError] = useState('')
  const [submitError, setSubmitError] = useState('')
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
    setSubmitError('')

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

    if (password.length < 8) {
      setPasswordError('Mínimo de 8 caracteres')

      if (!hasError) {
        passwordInputRef.current?.focus()
      }

      hasError = true
    }

    if (!acceptedTerms) {
      setTermsError('Aceite os termos para criar sua conta')
      hasError = true
    }

    if (hasError) {
      return
    }

    setIsSubmitting(true)

    try {
      const data = await authApi.register({
        name: nextName,
        email: nextEmail,
        password,
      })

      saveSession(data)
      onSignupSuccess()
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : 'Não foi possível concluir o cadastro.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="login-form signup-form" onSubmit={handleSubmit} noValidate>
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
          }}
          className={nameError ? 'error' : ''}
          aria-invalid={nameError ? 'true' : 'false'}
          aria-describedby={nameError ? 'signup-name-error' : undefined}
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
          }}
          className={emailError ? 'error' : ''}
          aria-invalid={emailError ? 'true' : 'false'}
          aria-describedby={emailError ? 'signup-email-error' : undefined}
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
          }}
          className={passwordError ? 'error' : ''}
          aria-invalid={passwordError ? 'true' : 'false'}
          aria-describedby={passwordError ? 'signup-password-error' : undefined}
        />
        <p id="signup-password-error" className={`form-error${passwordError ? ' show' : ''}`} role="alert">
          {passwordError}
        </p>
      </div>

      <label className="signup-terms" htmlFor="signup-terms">
        <input
          id="signup-terms"
          type="checkbox"
          checked={acceptedTerms}
          onChange={(event) => {
            setAcceptedTerms(event.target.checked)
            if (termsError) setTermsError('')
          }}
        />
        <span>Concordo com os Termos de uso e Política de privacidade do RiskCare.</span>
      </label>

      <p className={`form-error${termsError ? ' show' : ''}`} role="alert">
        {termsError}
      </p>

      {submitError && (
        <p className="form-error show" role="alert">
          {submitError}
        </p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  )
}

export default SignupForm
