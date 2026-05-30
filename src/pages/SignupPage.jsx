import { useState } from 'react'
import '../styles/login.css'
import LoginDivider from '../components/login/LoginDivider.jsx'
import LoginWarning from '../components/login/LoginWarning.jsx'
import SocialLoginButtons from '../components/login/SocialLoginButtons.jsx'
import SignupForm from '../components/login/SignupForm.jsx'
import { handleSpaLinkClick, navigateWithoutReload } from '../utils/navigation.js'

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignupSuccess = () => {
    setIsLoading(true)

    setTimeout(() => {
      navigateWithoutReload('/')
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
        <div className="login-logo">
          <img className="login-logo-image" src="/riskcare_logo.png" alt="Logo RiskCare" />
          <span>RISKCARE</span>
        </div>

        <h1>Crie sua conta</h1>
        <p className="login-subtitle">
          Já tem uma conta?{' '}
          <a href="/login" onClick={(event) => handleSpaLinkClick(event, '/login')}>
            Faça login
          </a>
        </p>

        <SocialLoginButtons />
        <LoginDivider />
        <SignupForm onSignupSuccess={handleSignupSuccess} />

        <p className="signup-link">
          Já possui conta?{' '}
          <a href="/login" onClick={(event) => handleSpaLinkClick(event, '/login')}>
            Faça login
          </a>
        </p>

        <LoginWarning />
      </section>
    </main>
  )
}

export default SignupPage
