import { LuExternalLink } from 'react-icons/lu'
import InternalLink from './InternalLink.jsx'
import RiskCareLogo from './RiskCareLogo.jsx'

const NAV_LINKS = [
  { href: '/formulario', label: 'Fazer avaliação' },
  { href: '/sinais-de-alerta', label: 'Sinais de alerta' },
  { href: '/mamografia', label: 'Mamografia' },
  { href: '/perguntas-frequentes', label: 'Perguntas' },
  { href: '/onde-buscar-ajuda', label: 'Onde buscar ajuda' },
  { href: '/noticias', label: 'Notícias' },
  { href: '/sobre-projeto', label: 'Sobre' },
]

const OFFICIAL_SOURCES = [
  { href: 'https://www.gov.br/saude', label: 'Ministério da Saúde' },
  { href: 'https://www.gov.br/inca', label: 'Instituto Nacional de Câncer (INCA)' },
  { href: 'https://bvsms.saude.gov.br', label: 'Biblioteca Virtual em Saúde (BVS)' },
]

function Footer() {
  const startYear = 2026
  const currentYear = new Date().getFullYear()
  const copyrightYears = currentYear <= startYear ? `${startYear}` : `${startYear} - ${currentYear}`

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <InternalLink className="site-footer__logo" href="/">
            <RiskCareLogo className="site-footer__logo-mark" />
            <span>RiskCare</span>
          </InternalLink>
          <p className="site-footer__desc">
            O RiskCare é um portal educativo com informações confiáveis sobre a saúde das mamas. Não faz diagnóstico
            nem substitui a avaliação de um profissional de saúde.
          </p>
        </div>

        <nav className="site-footer__col" aria-label="Navegação do rodapé">
          <h2 className="site-footer__heading">Navegação</h2>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <InternalLink href={link.href}>{link.label}</InternalLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Fontes oficiais</h2>
          <ul>
            {OFFICIAL_SOURCES.map((source) => (
              <li key={source.href}>
                <a className="site-footer__external" href={source.href} target="_blank" rel="noopener noreferrer">
                  {source.label}
                  <LuExternalLink aria-hidden="true" />
                  <span className="visually-hidden"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
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
          © {copyrightYears} RiskCare. Conteúdo educativo. <strong>Não substitui consulta médica.</strong>
        </p>
        <p className="site-footer__legal">Informação para uma vida com mais saúde.</p>
      </div>
    </footer>
  )
}

export default Footer
