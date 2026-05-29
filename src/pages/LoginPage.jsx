import { useState } from 'react'
import '../styles/login.css'
import LoginDivider from '../components/login/LoginDivider.jsx'
import LoginForm from '../components/login/LoginForm.jsx'
import LoginHeader from '../components/login/LoginHeader.jsx'
import LoginWarning from '../components/login/LoginWarning.jsx'
import SocialLoginButtons from '../components/login/SocialLoginButtons.jsx'

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoading(true)

    setTimeout(() => {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new Event('popstate'))
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
    <main className="login-page">
      <section className="login-card">
        <LoginHeader />
        <SocialLoginButtons />
        <LoginDivider />
        <LoginForm onLoginSuccess={handleLoginSuccess} />

        <p className="signup-link">
          N&atilde;o possui conta? <a href="#">Cadastre-se</a>
        </p>

        <LoginWarning />
      </section>
    </main>
  )
}

export default LoginPage
