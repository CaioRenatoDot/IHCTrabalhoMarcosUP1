import { useRef, useState } from 'react'

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const emailInputRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)

    if (!validEmail) {
      setErrorMessage('Digite um e-mail valido para entrar.')
      emailInputRef.current?.focus()
      return
    }

    setErrorMessage('')
    onLoginSuccess()
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="login-email">E-mail</label>
      <input
        ref={emailInputRef}
        id="login-email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="email@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-invalid={errorMessage ? 'true' : 'false'}
        aria-describedby={errorMessage ? 'login-error' : undefined}
      />

      <label htmlFor="login-password">Senha</label>
      <input
        id="login-password"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="************"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {errorMessage && (
        <p id="login-error" className="login-error" role="alert">
          {errorMessage}
        </p>
      )}

      <p className="forgot-password">
        Esqueceu sua senha? <a href="#">Clique aqui</a>
      </p>

      <button type="submit">Entrar na plataforma</button>
    </form>
  )
}

export default LoginForm
