import { useAuth } from '../contexts/AuthContext.jsx'
import { getAssessmentStorageKey, readStoredAssessment } from '../lib/riskAssessmentStorage.js'

function Navbar({ onNavigate, currentPath }) {
  const { latestAssessment, session, signOut } = useAuth()
  const storageKey = session?.user?.id ? getAssessmentStorageKey(session.user.id) : null
  const localAssessment = storageKey ? readStoredAssessment(storageKey) : null
  const hasSavedAssessment = Boolean(latestAssessment || localAssessment)

  const handleNavigate = (event, href) => {
    if (typeof onNavigate !== 'function') {
      return
    }

    event.preventDefault()
    onNavigate(href)
  }

  const isHomeActive = currentPath === '/'
  const isCoverActive = currentPath === '/sobre-projeto' || currentPath === '/cover'
  const ctaLabel = session
    ? (hasSavedAssessment ? 'Ver resultado' : 'Continuar avaliação')
    : 'Começar avaliação'
  const ctaHref = session
    ? (hasSavedAssessment ? '/resultados' : '/formulario')
    : '/login'

  const handleLogout = async (event) => {
    if (typeof onNavigate !== 'function') {
      return
    }

    event.preventDefault()
    const result = await signOut()

    if (result?.ok) {
      onNavigate('/')
    }
  }

  return (
    <header className="site-navbar">
      <a className="site-navbar__brand" href="/" onClick={(event) => handleNavigate(event, '/')}>
        <img
          className="site-navbar__brand-logo"
          src="/riskcare_logo.png"
          alt="Logo RiskCare"
        />
        RiskCare
      </a>

      <nav className="site-navbar__nav" aria-label="Navegação principal">
        <a
          href="/"
          className={isHomeActive ? 'is-active' : ''}
          onClick={(event) => handleNavigate(event, '/')}
        >
          Como funciona
        </a>
        <a
          href="/sobre-projeto"
          className={isCoverActive ? 'is-active' : ''}
          onClick={(event) => handleNavigate(event, '/sobre-projeto')}
        >
          Sobre o projeto
        </a>
      </nav>

      <div className="site-navbar__actions">
        {session ? (
          <button type="button" className="site-navbar__logout" onClick={handleLogout}>
            Sair
          </button>
        ) : null}

        <a
          className="site-navbar__cta"
          href={ctaHref}
          onClick={(event) => handleNavigate(event, ctaHref)}
        >
          {ctaLabel}
        </a>
      </div>
    </header>
  )
}

export default Navbar
