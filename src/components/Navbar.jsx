import { useAuth } from '../contexts/AuthContext.jsx'

function Navbar({ onNavigate, currentPath }) {
  const { session, signOut } = useAuth()

  const handleNavigate = (event, href) => {
    if (typeof onNavigate !== 'function') {
      return
    }

    event.preventDefault()
    onNavigate(href)
  }

  const isHomeActive = currentPath === '/'
  const isCoverActive = currentPath === '/sobre-projeto' || currentPath === '/cover'

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

      <nav className="site-navbar__nav" aria-label={'Navega\u00E7\u00E3o principal'}>
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
          href={session ? '/formulario' : '/login'}
          onClick={(event) => handleNavigate(event, session ? '/formulario' : '/login')}
        >
          {'Come\u00E7ar avalia\u00E7\u00E3o'}
        </a>
      </div>
    </header>
  )
}

export default Navbar
