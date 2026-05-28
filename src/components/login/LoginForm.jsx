function LoginForm() {
  return (
    <form className="login-form">
      <label>
        E-mail
        <input type="email" placeholder="email@email.com" />
      </label>

      <label>
        Senha
        <input type="password" placeholder="************" />
      </label>

      <p className="forgot-password">
        Esqueceu sua senha? <a href="#">Clique aqui</a>
      </p>

      <button type="submit">Entrar na plataforma</button>
    </form>
  )
}

export default LoginForm
