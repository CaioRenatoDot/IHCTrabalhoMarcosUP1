function Navbar() {
  return (
    <header className="site-navbar">
      <div className="site-navbar__brand">
        Risk<span>Care</span>
      </div>

      <nav className="site-navbar__nav" aria-label="Navegacao principal">
        <a href="#como-funciona">Como funciona</a>
        <a href="#fatores-de-risco">Fatores de risco</a>
        <a href="#sobre">Sobre</a>
      </nav>

      <a className="site-navbar__cta" href="#avaliacao">
        Começar avaliação
      </a>
    </header>
  )
}

export default Navbar
