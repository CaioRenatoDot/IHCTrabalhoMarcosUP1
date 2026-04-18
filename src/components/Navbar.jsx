function Navbar() {
  return (
    <header className="site-navbar">
      <div className="site-navbar__brand">
        Risk<span>Care</span>
      </div>

      <nav className="site-navbar__nav" aria-label={'Navega\u00E7\u00E3o principal'}>
        <a href="#como-funciona">Como funciona</a>
        <a href="#fatores-de-risco">Fatores de risco</a>
        <a href="#sobre">Sobre</a>
      </nav>

      <a className="site-navbar__cta" href="#avaliacao">
        {'Come\u00E7ar avalia\u00E7\u00E3o'}
      </a>
    </header>
  )
}

export default Navbar
