function Footer() {
  const startYear = 2026
  const currentYear = new Date().getFullYear()
  const copyrightYears =
    currentYear <= startYear ? `${startYear}` : `${startYear} - ${currentYear}`

  return (
    <footer className="site-footer" aria-label="Rodapé">
      <div className="site-footer__inner">
        <p className="site-footer__left">Desenvolvido por Estudantes</p>
        <p className="site-footer__center">© {copyrightYears} • RiskCare</p>
        <p className="site-footer__right">IHC</p>
      </div>
    </footer>
  )
}

export default Footer
