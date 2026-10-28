import { LuArrowRight } from 'react-icons/lu'
import InternalLink from './InternalLink.jsx'
import { CONTENT_REVIEWED_AT } from '../content/health.js'

function formatDate(isoDate) {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${isoDate}T12:00:00`),
  )
}

// Layout comum das páginas informativas: trilha, título, conteúdo, fontes e chamada para a avaliação.
function ContentPage({ title, lead, sources = [], showAssessmentCta = true, children }) {
  return (
    <main id="main-content" className="content-page" tabIndex={-1}>
      <div className="content-page__container">
        <nav className="content-page__breadcrumb" aria-label="Você está em">
          <InternalLink href="/">Início</InternalLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <header className="content-page__header">
          <h1 className="content-page__title">{title}</h1>
          {lead ? <p className="content-page__lead">{lead}</p> : null}
        </header>

        <div className="content-page__body">{children}</div>

        {sources.length ? (
          <section className="content-page__sources" aria-labelledby="content-sources-title">
            <h2 id="content-sources-title">Fontes</h2>
            <ul>
              {sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="content-page__reviewed">Conteúdo revisado em {formatDate(CONTENT_REVIEWED_AT)}.</p>
          </section>
        ) : null}

        {showAssessmentCta ? (
          <aside className="content-page__cta" aria-label="Avaliação de risco">
            <div>
              <h2>Quer entender seus fatores de risco?</h2>
              <p>Faça a avaliação educativa do RiskCare. Leva cerca de 5 minutos.</p>
            </div>
            <InternalLink className="content-button" href="/formulario">
              Fazer avaliação
              <LuArrowRight aria-hidden="true" />
            </InternalLink>
          </aside>
        ) : null}
      </div>
    </main>
  )
}

export default ContentPage
