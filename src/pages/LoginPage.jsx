import { useState } from 'react'
import '../styles/login.css'
import LoginDivider from '../components/login/LoginDivider.jsx'
import LoginForm from '../components/login/LoginForm.jsx'
import LoginHeader from '../components/login/LoginHeader.jsx'
import LoginWarning from '../components/login/LoginWarning.jsx'
import SocialLoginButtons from '../components/login/SocialLoginButtons.jsx'
import { handleSpaLinkClick, navigateWithoutReload } from '../utils/navigation.js'

function LoginBackButton() {
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

function LoginPage({ onToast }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoading(true)

    setTimeout(() => {
      if (typeof onToast === 'function') {
        onToast('Bem-vinda de volta!')
      }

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
        <LoginBackButton />
        <LoginHeader />
        <SocialLoginButtons />
        <LoginDivider text="Ou entre com e-mail" />
        <LoginForm onLoginSuccess={handleLoginSuccess} />

        <p className="signup-link">
          Não possui conta?{' '}
          <a href="/cadastro" onClick={(event) => handleSpaLinkClick(event, '/cadastro')}>
            Cadastre-se
          </a>
        </p>

        <LoginWarning />
      </section>
    </main>
  )
}

export default LoginPage
