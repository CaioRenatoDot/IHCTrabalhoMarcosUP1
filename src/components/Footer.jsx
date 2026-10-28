import InternalLink from './InternalLink.jsx'

function Footer() {
  const startYear = 2026
  const currentYear = new Date().getFullYear()
  const copyrightYears = currentYear <= startYear ? `${startYear}` : `${startYear} - ${currentYear}`

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <InternalLink className="site-footer__logo" href="/">
            <img src="/riskcare_logo.png" alt="" aria-hidden="true" />
            <span>RiskCare</span>
          </InternalLink>
          <p className="site-footer__desc">
            Avaliação educativa de fatores de risco para o câncer de mama, com orientações baseadas em fontes
            oficiais.
          </p>
        </div>

        <nav className="site-footer__col" aria-label="Navegação do rodapé">
          <h2 className="site-footer__heading">Navegação</h2>
          <ul>
            <li>
              <InternalLink href="/">Início</InternalLink>
            </li>
            <li>
              <InternalLink href="/formulario">Fazer avaliação</InternalLink>
            </li>
            <li>
              <InternalLink href="/sinais-de-alerta">Sinais de alerta</InternalLink>
            </li>
            <li>
              <InternalLink href="/mamografia">Quando fazer mamografia</InternalLink>
            </li>
            <li>
              <InternalLink href="/perguntas-frequentes">Perguntas frequentes</InternalLink>
            </li>
            <li>
              <InternalLink href="/onde-buscar-ajuda">Onde buscar ajuda</InternalLink>
            </li>
            <li>
              <InternalLink href="/sobre-projeto">Sobre o projeto e a equipe</InternalLink>
            </li>
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Apoio</h2>
          <ul>
            <li>
              Disque Saúde <a href="tel:136">136</a>
            </li>
            <li>
              CVV (apoio emocional) <a href="tel:188">188</a>
            </li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Legal</h2>
          <ul>
            <li>
              <InternalLink href="/termos-de-uso">Termos de uso</InternalLink>
            </li>
            <li>
              <InternalLink href="/politica-de-privacidade">Política de privacidade</InternalLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__legal">
          Conteúdo educativo. <strong>Não substitui consulta médica.</strong>
        </p>
        <p className="site-footer__legal">© {copyrightYears} RiskCare</p>
      </div>
    </footer>
  )
}

export default Footer
