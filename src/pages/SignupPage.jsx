import { useState } from 'react'
import '../styles/login.css'
import LoginDivider from '../components/login/LoginDivider.jsx'
import LoginWarning from '../components/login/LoginWarning.jsx'
import SocialLoginButtons from '../components/login/SocialLoginButtons.jsx'
import SignupForm from '../components/login/SignupForm.jsx'
import InternalLink from '../components/InternalLink.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { handleSpaLinkClick, navigateWithoutReload } from '../utils/navigation.js'

function SignupBackButton() {
  return (
    <button
      type="button"
      className="login-back"
      onClick={(event) => handleSpaLinkClick(event, '/')}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 12H5m7-7l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Voltar ao início
    </button>
  )
}

function SignupPage({ onToast }) {
  const [isLoading, setIsLoading] = useState(false)
  const { signUp } = useAuth()

  const handleSignup = async ({ fullName, email, password }) =>
    signUp({ fullName, email, password })

  const handleSignupSuccess = () => {
    setIsLoading(true)

    setTimeout(() => {
      if (typeof onToast === 'function') {
        onToast('Conta criada com sucesso!')
      }

      navigateWithoutReload('/sucesso-cadastro')
    }, 1400)
  }

  if (isLoading) {
    return (
      <main className="login-loading-page" aria-live="polite">
        <div className="login-loading-dots" aria-label="Carregando">
          <span />
          <span />
          <span />
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" tabIndex={-1} className="login-page">
      <section className="login-card">
        <SignupBackButton />

        <div className="login-logo">
          <img className="login-logo-image" src="/riskcare_logo.png" alt="Logo RiskCare" />
          <span>RISKCARE</span>
        </div>

        <h1>Crie sua conta</h1>
        <p className="login-subtitle">
          Já tem uma conta? <InternalLink href="/login">Faça login</InternalLink>
        </p>

        <SocialLoginButtons />
        <LoginDivider text="Ou cadastre-se com e-mail" />
        <SignupForm onSignup={handleSignup} onSignupSuccess={handleSignupSuccess} />

        <p className="signup-link">
          Já possui conta? <InternalLink href="/login">Faça login</InternalLink>
        </p>

        <LoginWarning />
      </section>
    </main>
  )
}

export default SignupPage
