import '../styles/login.css'
import { handleSpaLinkClick } from '../utils/navigation.js'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function SignupSuccessPage({ onToast }) {
  const handleGoToLogin = (event) => {
    handleSpaLinkClick(event, '/login')

    if (typeof onToast === 'function') {
      onToast('Faça login para iniciar sua avaliação')
    }
  }

  return (
    <main id="main-content" tabIndex={-1} className="login-page">
      <section className="login-card login-success-card" aria-label="Conta criada com sucesso">
        <div className="login-logo login-success-logo">
          <img className="login-logo-image" src="/riskcare_logo.png" alt="RiskCare" />
        </div>

        <div className="success-screen show">
          <div className="success-icon" aria-hidden="true">
            <CheckIcon />
          </div>

          <h3>Conta criada com sucesso!</h3>
          <p>
            Que bom ter você com a gente.
            <br />
            Agora você pode fazer login e começar sua avaliação.
          </p>

          <button type="button" className="success-cta" onClick={handleGoToLogin}>
            Ir para o login
          </button>
        </div>
      </section>
    </main>
  )
}

export default SignupSuccessPage
