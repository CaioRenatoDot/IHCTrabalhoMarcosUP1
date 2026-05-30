function Navbar({ onNavigate }) {
  const handleNavigate = (event, href) => {
    if (typeof onNavigate !== 'function') {
      return
    }

    event.preventDefault()
    onNavigate(href)
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
        <a href="/" onClick={(event) => handleNavigate(event, '/')}>
          Como funciona
        </a>
        <a href="/sobre-projeto" onClick={(event) => handleNavigate(event, '/sobre-projeto')}>
          Sobre o projeto
        </a>
      </nav>

      <a className="site-navbar__cta" href="/login" onClick={(event) => handleNavigate(event, '/login')}>
        {'Come\u00E7ar avalia\u00E7\u00E3o'}
      </a>
    </header>
  )
}

export default Navbar
