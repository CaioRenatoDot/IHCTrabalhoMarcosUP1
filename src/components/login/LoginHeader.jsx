import InternalLink from '../InternalLink.jsx'

function LoginHeader() {
  return (
    <>
      <div className="login-logo">
        <img className="login-logo-image" src="/riskcare_logo.png" alt="Logo RiskCare" />
        <span>RISKCARE</span>
      </div>

      <h1>Bem-vinda de volta</h1>
      <p className="login-subtitle">
        Ainda não possui conta? <InternalLink href="/cadastro">Cadastre-se grátis</InternalLink>
      </p>
    </>
  )
}

export default LoginHeader
