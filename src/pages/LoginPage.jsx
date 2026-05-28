import '../styles/login.css'
import LoginDivider from '../components/login/LoginDivider.jsx'
import LoginForm from '../components/login/LoginForm.jsx'
import LoginHeader from '../components/login/LoginHeader.jsx'
import LoginWarning from '../components/login/LoginWarning.jsx'
import SocialLoginButtons from '../components/login/SocialLoginButtons.jsx'

function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <LoginHeader />
        <SocialLoginButtons />
        <LoginDivider />
        <LoginForm />

        <p className="signup-link">
          N&atilde;o possui conta? <a href="#">Cadastre-se</a>
        </p>

        <LoginWarning />
      </section>
    </main>
  )
}

export default LoginPage
