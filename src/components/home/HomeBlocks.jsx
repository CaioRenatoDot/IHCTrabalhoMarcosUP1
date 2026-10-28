import { LuArrowRight, LuCheck, LuClipboardCheck, LuLightbulb, LuPhone } from 'react-icons/lu'
import InternalLink from '../InternalLink.jsx'
import { FACTS, SUPPORT_CONTACTS, getScreeningGuidance, getTipOfTheDay } from '../../content/health.js'
import { formatNewsDate, getRecentNews } from '../../content/news.js'

const SHORTCUTS = [
  { href: '/sinais-de-alerta', label: 'Sinais de alerta', text: 'O que observar nas mamas' },
  { href: '/mamografia', label: 'Quando fazer mamografia', text: 'Recomendações por idade' },
  { href: '/perguntas-frequentes', label: 'Perguntas frequentes', text: 'Dúvidas comuns respondidas' },
  { href: '/onde-buscar-ajuda', label: 'Onde buscar ajuda', text: 'UBS e telefones gratuitos' },
]

const ASSESSMENT_BENEFITS = [
  'Uma estimativa educativa de risco',
  'Os fatores que mais pesaram nas suas respostas',
  'Orientações para conversar com um profissional',
]

// Na home a fonte aparece na forma curta; o nome completo fica no título do link e nas páginas internas.
function SourceNote({ source }) {
  return (
    <p className="home-source">
      Fonte:{' '}
      <a href={source.url} target="_blank" rel="noopener noreferrer" title={source.label}>
        {source.short ?? source.label}
      </a>
    </p>
  )
}

export function TipBox() {
  const tip = getTipOfTheDay()

  return (
    <aside className="home-tip" aria-labelledby="home-tip-title">
      <LuLightbulb className="home-tip__icon" aria-hidden="true" />
      <div className="home-tip__body">
        <h2 id="home-tip-title" className="home-tip__title">
          Você sabia?
        </h2>
        <p className="home-tip__text">{tip.text}</p>
        <SourceNote source={tip.source} />
      </div>
      <InternalLink className="home-tip__link" href={tip.link.href}>
        {tip.link.label}
        <LuArrowRight aria-hidden="true" />
      </InternalLink>
    </aside>
  )
}

export function AssessmentCard({ hasAssessment, assessmentDate }) {
  return (
    <section className="home-card home-card--featured" aria-labelledby="home-assessment-title">
      <span className="home-card__icon">
        <LuClipboardCheck aria-hidden="true" />
      </span>
      <p className="home-card__eyebrow">Avaliação de risco</p>

      {hasAssessment ? (
        <>
          <h2 id="home-assessment-title" className="home-card__title">
            Sua avaliação está salva
          </h2>
          <p className="home-card__text">
            {assessmentDate ? `Feita em ${assessmentDate}. ` : ''}Veja o resultado e os fatores que mais pesaram nas
            suas respostas.
          </p>
          <div className="home-card__actions">
            <InternalLink className="home-button home-button--light" href="/resultados">
              Ver resultado
              <LuArrowRight aria-hidden="true" />
            </InternalLink>
            <InternalLink className="home-button home-button--ghost" href="/formulario">
              Refazer avaliação
            </InternalLink>
          </div>
        </>
      ) : (
        <>
          <h2 id="home-assessment-title" className="home-card__title">
            O que você recebe
          </h2>
          <ul className="home-benefits">
            {ASSESSMENT_BENEFITS.map((benefit) => (
              <li key={benefit}>
                <LuCheck aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
          <div className="home-card__actions">
            <InternalLink className="home-button home-button--light" href="/formulario">
              Começar avaliação
              <LuArrowRight aria-hidden="true" />
            </InternalLink>
          </div>
          <p className="home-card__note">Cerca de 5 minutos. Educativa e gratuita.</p>
        </>
      )}
    </section>
  )
}

export function ShortcutsCard() {
  return (
    <nav className="home-card" aria-labelledby="home-shortcuts-title">
      <p className="home-card__eyebrow">Informações e guias</p>
      <h2 id="home-shortcuts-title" className="home-card__title home-card__title--small">
        Comece por aqui
      </h2>
      <ul className="home-shortcuts">
        {SHORTCUTS.map((item) => (
          <li key={item.href}>
            <InternalLink href={item.href}>
              <span>
                <strong>{item.label}</strong>
                <small>{item.text}</small>
              </span>
              <LuArrowRight aria-hidden="true" />
            </InternalLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function ScreeningCard({ age }) {
  const guidance = getScreeningGuidance(age)

  return (
    <section className="home-card" aria-labelledby="home-screening-title">
      <p className="home-card__eyebrow">Quando fazer mamografia</p>
      {guidance ? (
        <>
          <h2 id="home-screening-title" className="home-card__title home-card__title--small">
            {guidance.title}
          </h2>
          <p className="home-card__text">{guidance.text}</p>
        </>
      ) : (
        <>
          <h2 id="home-screening-title" className="home-card__title home-card__title--small">
            Recomendação do SUS
          </h2>
          <dl className="home-rules">
            <div>
              <dt>50 a 74 anos</dt>
              <dd>a cada dois anos</dd>
            </div>
            <div>
              <dt>40 a 49 anos</dt>
              <dd>por demanda, após orientação</dd>
            </div>
          </dl>
        </>
      )}
      <InternalLink className="home-card__link" href="/mamografia">
        Ver todas as orientações
        <LuArrowRight aria-hidden="true" />
      </InternalLink>
    </section>
  )
}

export function SupportCard() {
  const contacts = SUPPORT_CONTACTS.filter((contact) => contact.number !== '192')

  return (
    <section className="home-card home-card--support" aria-labelledby="home-support-title">
      <p className="home-card__eyebrow">Apoio</p>
      <h2 id="home-support-title" className="home-card__title home-card__title--small">
        Precisa de ajuda?
      </h2>
      <ul className="home-contacts">
        {contacts.map((contact) => (
          <li key={contact.number}>
            <LuPhone aria-hidden="true" />
            <span>{contact.name}</span>
            <a href={`tel:${contact.number}`} aria-label={`Ligar para ${contact.name}, ${contact.number}`}>
              {contact.number}
            </a>
          </li>
        ))}
      </ul>
      <InternalLink className="home-card__link" href="/onde-buscar-ajuda">
        Onde buscar ajuda
        <LuArrowRight aria-hidden="true" />
      </InternalLink>
    </section>
  )
}

export function NewsList() {
  const news = getRecentNews(4)

  if (!news.length) {
    return null
  }

  return (
    <section className="home-news" aria-labelledby="home-news-title">
      <h2 id="home-news-title" className="home-section-title">
        Notícias e atualizações
      </h2>
      <ul className="home-news__list">
        {news.map((item) => (
          <li className="home-news__item" key={item.id}>
            <p className="home-news__meta">
              <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{item.source}</span>
            </p>
            <a className="home-news__title" href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
              <span className="visually-hidden"> (abre o site em nova aba)</span>
            </a>
            <p className="home-news__summary">{item.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function FactsCard() {
  return (
    <section className="home-facts" aria-labelledby="home-facts-title">
      <h2 id="home-facts-title" className="home-section-title">
        Em números
      </h2>
      <ul className="home-facts__list">
        {FACTS.map((fact) => (
          <li key={fact.value}>
            <span className="home-facts__value">{fact.value}</span>
            <p className="home-facts__text">{fact.text}</p>
            <SourceNote source={fact.source} />
          </li>
        ))}
      </ul>
    </section>
  )
}
