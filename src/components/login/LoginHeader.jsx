import { handleSpaLinkClick } from '../../utils/navigation.js'

function LoginHeader() {
  return (
    <>
      <div className="login-logo">
        <img className="login-logo-image" src="/riskcare_logo.png" alt="Logo RiskCare" />
        <span>RISKCARE</span>
      </div>

      <h1>Bem-vinda de volta</h1>
      <p className="login-subtitle">
        Ainda não possui conta?{' '}
        <a href="/cadastro" onClick={(event) => handleSpaLinkClick(event, '/cadastro')}>
          Cadastre-se grátis
        </a>
      </p>
    </>
  )
}

export default LoginHeader
