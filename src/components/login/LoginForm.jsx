import { useState } from 'react'

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)

    if (!validEmail) {
      setErrorMessage('Digite um e-mail valido para entrar.')
      return
    }

    setErrorMessage('')
    onLoginSuccess()
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        E-mail
        <input
          type="email"
          placeholder="email@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <label>
        Senha
        <input
          type="password"
          placeholder="************"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      {errorMessage && <p className="login-error">{errorMessage}</p>}

      <p className="forgot-password">
        Esqueceu sua senha? <a href="#">Clique aqui</a>
      </p>

      <button type="submit">Entrar na plataforma</button>
    </form>
  )
}

export default LoginForm
