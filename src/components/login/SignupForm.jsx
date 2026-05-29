import { useState } from 'react'

function SignupForm({ onSignupSuccess }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)

    if (fullName.trim().length < 3) {
      setErrorMessage('Digite seu nome completo para continuar.')
      return
    }

    if (!validEmail) {
      setErrorMessage('Digite um e-mail v\u00e1lido para continuar.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter no m\u00ednimo 6 caracteres.')
      return
    }

    if (!acceptedTerms) {
      setErrorMessage('Voc\u00ea precisa aceitar os termos para criar sua conta.')
      return
    }

    setErrorMessage('')
    onSignupSuccess()
  }

  return (
    <form className="login-form signup-form" onSubmit={handleSubmit}>
      <label>
        Nome completo
        <input
          type="text"
          placeholder="Digite seu nome..."
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
      </label>

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

      <label className="signup-terms">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.target.checked)}
        />
        <span>
          Concordo com os Termos de uso e Pol\u00edtica de privacidade do RiskCare.
        </span>
      </label>

      {errorMessage && <p className="login-error">{errorMessage}</p>}

      <button type="submit">Cadastrar</button>
    </form>
  )
}

export default SignupForm
