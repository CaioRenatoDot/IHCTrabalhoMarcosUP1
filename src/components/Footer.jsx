import InternalLink from './InternalLink.jsx'

function Footer() {
  const startYear = 2026
  const currentYear = new Date().getFullYear()
  const copyrightYears =
    currentYear <= startYear ? `${startYear}` : `${startYear} - ${currentYear}`

  return (
    <footer className="site-footer" aria-label="Rodapé">
      <div className="site-footer__inner">
        <p className="site-footer__left site-footer__text">
          Conteúdo educativo. <strong>Não substitui consulta médica.</strong>
        </p>
        <p className="site-footer__center site-footer__text">
          © {copyrightYears} <strong>RiskCare</strong>
        </p>
        <p className="site-footer__right site-footer__text">
          <InternalLink href="/sobre-projeto">Sobre o projeto e a equipe</InternalLink>
        </p>
      </div>
      <div className="site-footer__links" aria-label="Links legais">
        <InternalLink href="/termos-de-uso">Termos de uso</InternalLink>
        <span aria-hidden="true">•</span>
        <InternalLink href="/politica-de-privacidade">Política de privacidade</InternalLink>
      </div>
    </footer>
  )
}

export default Footer
