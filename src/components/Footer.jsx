function Footer() {
  const startYear = 2026
  const currentYear = new Date().getFullYear()
  const copyrightYears =
    currentYear <= startYear ? `${startYear}` : `${startYear} - ${currentYear}`

  return (
    <footer className="site-footer" aria-label="Rodapé">
      <div className="site-footer__inner">
        <p className="site-footer__left site-footer__text">
          Desenvolvido por <strong>Estudantes</strong>
        </p>
        <p className="site-footer__center site-footer__text">
          © {copyrightYears} • <strong>RiskCare</strong>
        </p>
        <p className="site-footer__right site-footer__text">Projeto acadêmico de IHC</p>
      </div>
    </footer>
  )
}

export default Footer
