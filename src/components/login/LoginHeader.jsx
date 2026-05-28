function LoginHeader() {
  return (
    <>
      <div className="login-logo">
        <img
          className="login-logo-image"
          src="/riskcare_logo.png"
          alt="Logo RiskCare"
        />
        <span>RISKCARE</span>
      </div>

      <h1>Bem-vinda de volta</h1>
      <p className="login-subtitle">
        Ainda n&atilde;o possui conta? <a href="#">Cadastre-se gr&aacute;tis</a>
      </p>
    </>
  )
}

export default LoginHeader
