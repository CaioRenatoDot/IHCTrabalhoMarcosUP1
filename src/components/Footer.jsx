import { handleSpaLinkClick } from '../utils/navigation.js'

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
          © {copyrightYears} <strong>RiskCare</strong>
        </p>
        <p className="site-footer__right site-footer__text">Projeto acadêmico de IHC</p>
      </div>
      <div className="site-footer__links" aria-label="Links legais">
        <a href="/termos-de-uso" onClick={(event) => handleSpaLinkClick(event, '/termos-de-uso')}>
          Termos de uso
        </a>
        <span aria-hidden="true">•</span>
        <a
          href="/politica-de-privacidade"
          onClick={(event) => handleSpaLinkClick(event, '/politica-de-privacidade')}
        >
          Política de privacidade
        </a>
      </div>
    </footer>
  )
}

export default Footer
