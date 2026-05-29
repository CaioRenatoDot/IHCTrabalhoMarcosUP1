import { useState } from 'react'
import '../styles/login.css'
import LoginDivider from '../components/login/LoginDivider.jsx'
import LoginForm from '../components/login/LoginForm.jsx'
import LoginHeader from '../components/login/LoginHeader.jsx'
import LoginWarning from '../components/login/LoginWarning.jsx'
import SocialLoginButtons from '../components/login/SocialLoginButtons.jsx'
import TextZoomControls from '../components/accessibility/TextZoomControls.jsx'

const MIN_FONT_SCALE = 0.85
const MAX_FONT_SCALE = 1.5
const FONT_SCALE_STEP = 0.15

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [fontScale, setFontScale] = useState(1)

  const decreaseFontScale = () => {
    setFontScale((currentScale) =>
      Math.max(MIN_FONT_SCALE, Number((currentScale - FONT_SCALE_STEP).toFixed(2))),
    )
  }

  const increaseFontScale = () => {
    setFontScale((currentScale) =>
      Math.min(MAX_FONT_SCALE, Number((currentScale + FONT_SCALE_STEP).toFixed(2))),
    )
  }

  const handleLoginSuccess = () => {
    setIsLoading(true)

    setTimeout(() => {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new Event('popstate'))
    }, 1400)
  }

  if (isLoading) {
    return (
      <main
        className="login-loading-page"
        style={{ '--login-text-scale': fontScale }}
        aria-live="polite"
      >
        <div className="login-loading-dots" aria-label="Carregando">
          <span />
          <span />
          <span />
        </div>
      </main>
    )
  }

  return (
    <main className="login-page" style={{ '--login-text-scale': fontScale }}>
      <TextZoomControls
        fontScale={fontScale}
        minFontScale={MIN_FONT_SCALE}
        maxFontScale={MAX_FONT_SCALE}
        onDecrease={decreaseFontScale}
        onReset={() => setFontScale(1)}
        onIncrease={increaseFontScale}
      />

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
