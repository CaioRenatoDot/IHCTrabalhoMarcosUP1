import { useState } from 'react'
import '../styles/login.css'
import LoginDivider from '../components/login/LoginDivider.jsx'
import LoginWarning from '../components/login/LoginWarning.jsx'
import SocialLoginButtons from '../components/login/SocialLoginButtons.jsx'
import SignupForm from '../components/login/SignupForm.jsx'
import TextZoomControls from '../components/accessibility/TextZoomControls.jsx'

const MIN_FONT_SCALE = 0.85
const MAX_FONT_SCALE = 1.5
const FONT_SCALE_STEP = 0.15

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [fontScale, setFontScale] = useState(1)
  const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false)
  const [magnifier, setMagnifier] = useState({
    isVisible: false,
    text: '',
    x: 0,
    y: 0,
  })

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

  const handleSignupSuccess = () => {
    setIsLoading(true)

    setTimeout(() => {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new Event('popstate'))
    }, 1400)
  }

  const handleMagnifierMove = (event) => {
    if (!isMagnifierEnabled) {
      return
    }

    if (event.target.closest('.text-zoom-controls')) {
      setMagnifier((currentState) => ({ ...currentState, isVisible: false }))
      return
    }

    const textElement = event.target.closest('h1, p, a, label, button, span, input')

    if (!textElement || !event.currentTarget.contains(textElement)) {
      setMagnifier((currentState) => ({ ...currentState, isVisible: false }))
      return
    }

    const text =
      textElement instanceof HTMLInputElement
        ? textElement.value || textElement.placeholder
        : textElement.textContent

    const cleanText = text.replace(/\s+/g, ' ').trim()

    if (!cleanText) {
      setMagnifier((currentState) => ({ ...currentState, isVisible: false }))
      return
    }

    setMagnifier({
      isVisible: true,
      text: cleanText.slice(0, 120),
      x: event.clientX + 18,
      y: event.clientY + 18,
    })
  }

  const hideMagnifier = () => {
    setMagnifier((currentState) => ({ ...currentState, isVisible: false }))
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
    <main
      className="login-page"
      style={{ '--login-text-scale': fontScale }}
      onMouseMove={handleMagnifierMove}
      onMouseLeave={hideMagnifier}
    >
      <TextZoomControls
        fontScale={fontScale}
        minFontScale={MIN_FONT_SCALE}
        maxFontScale={MAX_FONT_SCALE}
        isMagnifierEnabled={isMagnifierEnabled}
        onDecrease={decreaseFontScale}
        onReset={() => setFontScale(1)}
        onIncrease={increaseFontScale}
        onToggleMagnifier={() => {
          setIsMagnifierEnabled((currentValue) => !currentValue)
          hideMagnifier()
        }}
      />

      {isMagnifierEnabled && magnifier.isVisible && (
        <div className="text-magnifier" style={{ left: magnifier.x, top: magnifier.y }}>
          {magnifier.text}
        </div>
      )}

      <section className="login-card">
        <div className="login-logo">
          <img className="login-logo-image" src="/riskcare_logo.png" alt="Logo RiskCare" />
          <span>RISKCARE</span>
        </div>

        <h1>Crie sua conta</h1>
        <p className="login-subtitle">
          J&aacute; tem uma conta? <a href="/login">Fa&ccedil;a login</a>
        </p>

        <SocialLoginButtons />
        <LoginDivider />
        <SignupForm onSignupSuccess={handleSignupSuccess} />

        <p className="signup-link">
          J&aacute; possui conta? <a href="/login">Fa&ccedil;a login</a>
        </p>

        <LoginWarning />
      </section>
    </main>
  )
}

export default SignupPage
