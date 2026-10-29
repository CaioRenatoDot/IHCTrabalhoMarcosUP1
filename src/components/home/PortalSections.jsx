// Blocos da home pública (visitante), conforme docs/design/home-v2/referencia.png.
import {
  LuArrowRight,
  LuBookOpen,
  LuCalendarDays,
  LuExternalLink,
  LuMapPin,
  LuNewspaper,
  LuPhone,
} from 'react-icons/lu'
import InternalLink from '../InternalLink.jsx'
import { FACTS, SUPPORT_CONTACTS } from '../../content/health.js'
import { formatNewsDate, getRecentNews } from '../../content/news.js'

const START_LINKS = [
  {
    href: '/sinais-de-alerta',
    icon: LuBookOpen,
    title: 'Sinais de alerta',
    text: 'Conheça os principais sinais de atenção nas mamas.',
  },
  {
    href: '/mamografia',
    icon: LuCalendarDays,
    title: 'Mamografia e acompanhamento',
    text: 'Entenda quando fazer e como é o exame.',
  },
  {
    href: '/onde-buscar-ajuda',
    icon: LuMapPin,
    title: 'Onde buscar atendimento',
    text: 'Saiba onde encontrar um serviço de saúde perto de você.',
  },
]

const NEXT_STEPS = [
  {
    title: 'Reconhecer uma alteração',
    text: 'Fique atenta a mudanças nas mamas e conheça os principais sinais de alerta.',
    link: { href: '/sinais-de-alerta', label: 'Saiba quais são os sinais' },
  },
  {
    title: 'Buscar uma UBS ou serviço de saúde',
    text: 'Procure a unidade básica de saúde (UBS) mais próxima ou um serviço de saúde da sua região.',
    link: { href: '/onde-buscar-ajuda', label: 'Encontre onde buscar atendimento' },
  },
  {
    title: 'Conversar com um profissional',
    text: 'Um profissional de saúde pode avaliar sua situação, orientar os próximos passos e, se necessário, pedir exames.',
    link: { href: '/perguntas-frequentes', label: 'Tire suas dúvidas' },
  },
]

function ExternalSource({ source }) {
  return (
    <p className="portal-source">
      Fonte:{' '}
      <a href={source.url} target="_blank" rel="noopener noreferrer" title={source.label}>
        {source.short ?? source.label}
        <LuExternalLink aria-hidden="true" />
        <span className="visually-hidden"> (abre em nova aba)</span>
      </a>
    </p>
  )
}

export function PortalHero() {
  return (
    <section className="portal-hero" aria-labelledby="portal-hero-title">
      <div className="portal-hero__inner">
        <div className="portal-hero__content">
          <p className="portal-eyebrow">RiskCare · Saúde das mamas</p>
          <h1 id="portal-hero-title" className="portal-hero__title">
            Entenda os sinais e saiba quando buscar atendimento
          </h1>
          <p className="portal-hero__lead">
            Informação confiável para você cuidar da saúde das mamas e saber quando procurar um serviço de saúde.
          </p>
          <div className="portal-hero__actions">
            <InternalLink className="portal-button portal-button--primary" href="/formulario">
              Fazer avaliação
              <LuArrowRight aria-hidden="true" />
            </InternalLink>
            <InternalLink className="portal-button portal-button--outline" href="/sinais-de-alerta">
              Entender os sinais
            </InternalLink>
          </div>
        </div>
      </div>
      <figure className="portal-hero__media">
        <img
          src="/images/home-consulta.jpg"
          alt="Médica conversa com uma paciente durante uma consulta"
          width="1200"
          height="800"
        />
        <figcaption>
          Foto:{' '}
          <a href="https://www.pexels.com/photo/doctor-consulting-a-patient-7659873/" target="_blank" rel="noopener noreferrer">
            Thirdman / Pexels
          </a>
        </figcaption>
      </figure>
    </section>
  )
}

export function StartHereBand() {
  return (
    <section className="portal-start" aria-labelledby="portal-start-title">
      <div className="portal-start__intro">
        <h2 id="portal-start-title" className="portal-start__title">
          Comece por aqui
        </h2>
        <p>Acesse os principais conteúdos do RiskCare para se informar e dar o próximo passo.</p>
      </div>
      <ul className="portal-start__links">
        {START_LINKS.map((item) => {
          const Icon = item.icon

          return (
            <li key={item.href}>
              <InternalLink className="portal-start__link" href={item.href}>
                <Icon className="portal-start__icon" aria-hidden="true" />
                <span className="portal-start__link-title">{item.title}</span>
                <span className="portal-start__link-text">{item.text}</span>
                <LuArrowRight className="portal-start__arrow" aria-hidden="true" />
              </InternalLink>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function FeaturedNews() {
  const news = getRecentNews(3)

  if (!news.length) {
    return null
  }

  return (
    <section className="portal-news" aria-labelledby="portal-news-title">
      <div className="portal-news__header">
        <h2 id="portal-news-title" className="portal-section-title">
          Notícias em destaque
        </h2>
        <InternalLink className="portal-link" href="/noticias">
          Ver todas as notícias
          <LuArrowRight aria-hidden="true" />
        </InternalLink>
      </div>
      <ul className="portal-news__list">
        {news.map((item) => (
          <li className="portal-news__item" key={item.id}>
            <span className="portal-news__thumb" aria-hidden="true">
              <LuNewspaper />
              <span>{item.source}</span>
            </span>
            <div className="portal-news__body">
              <time className="portal-news__date" dateTime={item.date}>
                {formatNewsDate(item.date)}
              </time>
              <h3 className="portal-news__title">{item.title}</h3>
              <p className="portal-news__summary">{item.summary}</p>
              <a className="portal-news__source" href={item.url} target="_blank" rel="noopener noreferrer">
                Fonte: {item.source}
                <LuExternalLink aria-hidden="true" />
                <span className="visually-hidden"> (abre a notícia em nova aba)</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function NumbersPanel() {
  return (
    <section className="portal-numbers" aria-labelledby="portal-numbers-title">
      <h2 id="portal-numbers-title" className="portal-numbers__title">
        Em números
      </h2>
      <p className="portal-numbers__lead">
        Dados oficiais que mostram a importância da atenção à saúde das mamas no Brasil.
      </p>
      <ul className="portal-numbers__list">
        {FACTS.map((fact) => (
          <li className="portal-numbers__row" key={fact.value}>
            <span className="portal-numbers__value">{fact.value}</span>
            <div>
              <p className="portal-numbers__text">{fact.text}</p>
              <ExternalSource source={fact.source} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function HelpCard() {
  const disqueSaude = SUPPORT_CONTACTS.find((contact) => contact.number === '136')
  const cvv = SUPPORT_CONTACTS.find((contact) => contact.number === '188')

  return (
    <section className="portal-help" aria-labelledby="portal-help-title">
      <LuPhone className="portal-help__icon" aria-hidden="true" />
      <div>
        <h2 id="portal-help-title" className="portal-help__title">
          Precisa de ajuda?
        </h2>
        <a className="portal-help__number" href="tel:136" aria-label="Ligar para o Disque Saúde, 136">
          Disque Saúde 136
        </a>
        <p className="portal-help__text">{disqueSaude?.description}</p>
        {cvv ? (
          <p className="portal-help__text">
            Apoio emocional: CVV{' '}
            <a href="tel:188" aria-label="Ligar para o CVV, 188">
              188
            </a>
            , 24 horas.
          </p>
        ) : null}
        <InternalLink className="portal-link" href="/onde-buscar-ajuda">
          Ver onde buscar atendimento
          <LuArrowRight aria-hidden="true" />
        </InternalLink>
      </div>
    </section>
  )
}

export function NextSteps() {
  return (
    <section className="portal-steps" aria-labelledby="portal-steps-title">
      <div className="portal-container">
        <h2 id="portal-steps-title" className="portal-section-title portal-section-title--large">
          O que fazer agora?
        </h2>
        <p className="portal-steps__lead">Se você identificou alguma alteração nas mamas, siga estes passos:</p>
        <ol className="portal-steps__list">
          {NEXT_STEPS.map((step, index) => (
            <li className="portal-steps__item" key={step.title}>
              <span className="portal-steps__number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3 className="portal-steps__title">{step.title}</h3>
                <p className="portal-steps__text">{step.text}</p>
                <InternalLink className="portal-link" href={step.link.href}>
                  {step.link.label}
                  <LuArrowRight aria-hidden="true" />
                </InternalLink>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
