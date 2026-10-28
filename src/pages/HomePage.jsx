import {
  LuArrowRight,
  LuChartColumn,
  LuChevronDown,
  LuClock,
  LuPhone,
  LuShieldCheck,
  LuStethoscope,
  LuTriangleAlert,
  LuBookOpen,
  LuClipboardList,
  LuExternalLink,
} from 'react-icons/lu'
import InternalLink from '../components/InternalLink.jsx'
import { formatNewsDate, getRecentNews } from '../content/news.js'

const SOURCES = {
  incaEstimate: {
    label: 'INCA, Estimativa 2026–2028',
    url: 'https://www.gov.br/inca/pt-br/assuntos/cancer/numeros/estimativa/sintese-de-resultados-e-comentarios',
  },
  incaEstimateNews: {
    label: 'INCA, Estimativa 2026–2028',
    url: 'https://www.gov.br/inca/pt-br/assuntos/noticias/2026/inca-estima-781-mil-novos-casos-de-cancer-por-ano-no-brasil-entre-2026-e-2028',
  },
  incaBooklet: {
    label: 'INCA, Câncer de mama: vamos falar sobre isso? (2026)',
    url: 'https://ninho.inca.gov.br/jspui/bitstream/123456789/18158/1/cartilha-mama-2026%20-%20DefesoEleitoral.pdf',
  },
}

const TRUST_ITEMS = [
  { icon: LuClock, text: 'Cerca de 5 minutos' },
  { icon: LuBookOpen, text: 'Baseado em fontes oficiais' },
  { icon: LuShieldCheck, text: 'Gratuito e educativo' },
]

const FACTS = [
  {
    value: '78.610',
    text: 'novos casos de câncer de mama estimados por ano no Brasil entre 2026 e 2028',
    source: SOURCES.incaEstimate,
  },
  {
    value: '1º',
    text: 'tipo de câncer mais frequente entre as mulheres brasileiras, sem contar o de pele não melanoma',
    source: SOURCES.incaEstimateNews,
  },
  {
    value: '5 a 10%',
    text: 'dos casos estão relacionados a fatores hereditários, como alterações genéticas na família',
    source: SOURCES.incaBooklet,
  },
]

const BENEFITS = [
  {
    icon: LuClipboardList,
    title: 'Perguntas objetivas',
    text: 'Idade, histórico pessoal e familiar, fatores hormonais e hábitos, em etapas curtas.',
  },
  {
    icon: LuChartColumn,
    title: 'Resultado explicado',
    text: 'Uma estimativa educativa e os fatores que mais pesaram nas suas respostas.',
  },
  {
    icon: LuStethoscope,
    title: 'Ponto de partida para a consulta',
    text: 'Informação organizada para você conversar com quem acompanha a sua saúde.',
  },
]

const WARNING_SIGNS = [
  'Nódulo (caroço), geralmente endurecido e indolor',
  'Pele da mama avermelhada, retraída ou parecida com casca de laranja',
  'Alterações no bico do peito (mamilo)',
  'Saída espontânea de líquido anormal pelos mamilos',
  'Pequenos nódulos nas axilas ou no pescoço',
]

const STEPS = [
  {
    title: 'Responda ao questionário',
    text: 'Entre ou crie sua conta e responda às perguntas no seu ritmo.',
  },
  {
    title: 'Veja seu resultado',
    text: 'Entenda sua estimativa e quais fatores mais influenciaram.',
  },
  {
    title: 'Converse com um profissional',
    text: 'Leve o resultado para a consulta e tire suas dúvidas.',
  },
]

const FAQ = [
  {
    question: 'A avaliação faz diagnóstico?',
    answer:
      'Não. Ela é educativa: organiza suas respostas e mostra fatores associados ao risco. Somente um profissional de saúde pode avaliar se há alguma alteração e indicar exames.',
  },
  {
    question: 'Ter um fator de risco significa que vou ter câncer?',
    answer:
      'Não. Ter um ou mais fatores de risco não significa que a doença vai aparecer. Eles ajudam a entender quando vale conversar com um profissional sobre acompanhamento.',
  },
  {
    question: 'Quem pode fazer a avaliação?',
    answer:
      'Mulheres a partir de 18 anos. O câncer de mama também pode atingir homens, mas é raro; nesse caso, converse com um profissional sobre o seu histórico.',
  },
  {
    question: 'Preciso criar uma conta?',
    answer:
      'Por enquanto, sim: a conta permite salvar sua avaliação e consultar o resultado depois. Seus dados são tratados conforme a política de privacidade.',
    link: { href: '/politica-de-privacidade', label: 'Ler a política de privacidade' },
  },
]

const SUPPORT_CONTACTS = [
  {
    name: 'Disque Saúde',
    number: '136',
    description: 'Ministério da Saúde: informações sobre saúde e serviços do SUS. Ligação gratuita.',
  },
  {
    name: 'CVV',
    number: '188',
    description: 'Centro de Valorização da Vida: apoio emocional, 24 horas. Ligação gratuita.',
  },
]

function SourceLink({ source }) {
  return (
    <a className="home-source-link" href={source.url} target="_blank" rel="noopener noreferrer">
      {source.label}
    </a>
  )
}

function AssessmentPreview() {
  return (
    <div className="home-preview" aria-hidden="true">
      <div className="home-preview__header">
        <img src="/riskcare_logo.png" alt="" />
        <span>Avaliação RiskCare</span>
      </div>
      <div className="home-preview__progress">
        <span className="home-preview__step">Etapa 1 · Sobre você</span>
        <div className="home-preview__bar">
          <span />
        </div>
      </div>
      <div className="home-preview__field">
        <span className="home-preview__label">Qual a sua idade?</span>
        <span className="home-preview__input">45 anos</span>
      </div>
      <div className="home-preview__field">
        <span className="home-preview__label">Alguma parente próxima teve câncer de mama?</span>
        <div className="home-preview__options">
          <span className="is-selected">Não</span>
          <span>Sim</span>
          <span>Não sei</span>
        </div>
      </div>
      <span className="home-preview__button">Continuar</span>
    </div>
  )
}

function NewsSection() {
  const news = getRecentNews(3)

  if (!news.length) {
    return null
  }

  return (
    <section className="home-block" aria-labelledby="noticias-title">
      <div className="home-container">
        <div className="home-block__header">
          <p className="home-eyebrow">Notícias</p>
          <h2 id="noticias-title" className="section-title">
            Notícias e atualizações
          </h2>
          <p className="section-sub">Novidades de fontes oficiais sobre prevenção e cuidado do câncer de mama.</p>
        </div>

        <ul className="home-news">
          {news.map((item) => (
            <li className="home-news__card" key={item.id}>
              <div className="home-news__meta">
                <span className="home-news__source">{item.source}</span>
                <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
              </div>
              <h3 className="home-news__title">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                  <span className="visually-hidden"> (abre o site {item.source} em nova aba)</span>
                </a>
              </h3>
              <p className="home-news__summary">{item.summary}</p>
              <span className="home-news__more" aria-hidden="true">
                Ler na fonte
                <LuExternalLink />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <main id="main-content" className="home-page" tabIndex={-1}>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-container home-hero__grid">
          <div className="home-hero__content">
            <p className="home-eyebrow">Avaliação educativa de risco</p>
            <h1 id="home-hero-title" className="home-hero__title">
              Entenda seus fatores de risco para o <span>câncer de mama</span>
            </h1>
            <p className="home-hero__lead">
              Responda a perguntas sobre sua saúde, seu histórico familiar e seus hábitos e receba orientações claras,
              baseadas em fontes oficiais como o INCA.
            </p>
            <div className="home-hero__actions">
              <InternalLink className="home-button home-button--primary" href="/formulario">
                Fazer avaliação
                <LuArrowRight aria-hidden="true" />
              </InternalLink>
              <InternalLink className="home-button home-button--secondary" href="/#como-funciona">
                Como funciona
              </InternalLink>
            </div>
            <ul className="home-trust">
              {TRUST_ITEMS.map((item) => {
                const Icon = item.icon

                return (
                  <li key={item.text}>
                    <Icon aria-hidden="true" />
                    {item.text}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="home-hero__visual">
            <AssessmentPreview />
          </div>
        </div>
      </section>

      <section className="home-facts" aria-labelledby="home-facts-title">
        <div className="home-container">
          <h2 id="home-facts-title" className="home-facts__title">
            Por que falar sobre isso
          </h2>
          <ul className="home-facts__list">
            {FACTS.map((fact) => (
              <li className="home-fact" key={fact.value}>
                <span className="home-fact__value">{fact.value}</span>
                <p className="home-fact__text">{fact.text}</p>
                <p className="home-fact__source">
                  Fonte: <SourceLink source={fact.source} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-block" aria-labelledby="beneficios-title">
        <div className="home-container">
          <div className="home-block__header">
            <p className="home-eyebrow">A avaliação</p>
            <h2 id="beneficios-title" className="section-title">
              Informação clara para cuidar da sua saúde
            </h2>
          </div>
          <ul className="home-benefits">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon

              return (
                <li className="home-benefit" key={benefit.title}>
                  <span className="home-benefit__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section id="sinais" className="home-block home-block--surface" aria-labelledby="sinais-title" tabIndex={-1}>
        <div className="home-container home-signs">
          <div className="home-signs__intro">
            <p className="home-eyebrow home-eyebrow--danger">Atenção aos sinais</p>
            <h2 id="sinais-title" className="section-title">
              Sinais que merecem avaliação
            </h2>
            <p className="section-sub">
              Conhecer o próprio corpo ajuda a perceber mudanças. Se notar alguma destas alterações, não espere pelo
              próximo exame de rotina.
            </p>
            <div className="home-callout" role="note">
              <LuTriangleAlert className="home-callout__icon" aria-hidden="true" />
              <p>
                <strong>Procure uma unidade de saúde</strong> para avaliação. A maioria das alterações não é câncer, mas
                todas devem ser investigadas.
              </p>
            </div>
          </div>

          <div className="home-signs__panel">
            <ol className="home-signs__list">
              {WARNING_SIGNS.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ol>
            <p className="home-source">
              Fonte: <SourceLink source={SOURCES.incaBooklet} />
            </p>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="home-block" aria-labelledby="como-funciona-title" tabIndex={-1}>
        <div className="home-container">
          <div className="home-block__header home-block__header--center">
            <p className="home-eyebrow">Como funciona</p>
            <h2 id="como-funciona-title" className="section-title">
              Três passos, cerca de 5 minutos
            </h2>
          </div>

          <ol className="home-steps">
            {STEPS.map((step, index) => (
              <li className="how-step" key={step.title}>
                <span className="how-step-num" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NewsSection />

      <section className="home-block home-block--surface" aria-labelledby="faq-title">
        <div className="home-container home-faq">
          <div className="home-faq__intro">
            <p className="home-eyebrow">Dúvidas</p>
            <h2 id="faq-title" className="section-title">
              Perguntas frequentes
            </h2>
          </div>
          <div className="home-faq__list">
            {FAQ.map((item) => (
              <details className="home-faq__item" key={item.question}>
                <summary>
                  {item.question}
                  <LuChevronDown className="home-faq__chevron" aria-hidden="true" />
                </summary>
                <p>
                  {item.answer}{' '}
                  {item.link ? <InternalLink href={item.link.href}>{item.link.label}</InternalLink> : null}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="apoio" className="home-block" aria-labelledby="apoio-title" tabIndex={-1}>
        <div className="home-container home-support">
          <div className="home-block__header">
            <p className="home-eyebrow">Apoio</p>
            <h2 id="apoio-title" className="section-title">
              Onde buscar ajuda
            </h2>
            <p className="section-sub">
              Para dúvidas sobre exames e atendimento, procure a unidade básica de saúde mais próxima. Você também pode
              ligar gratuitamente:
            </p>
          </div>

          <ul className="home-support__list">
            {SUPPORT_CONTACTS.map((contact) => (
              <li className="home-support__item" key={contact.number}>
                <span className="home-support__icon">
                  <LuPhone aria-hidden="true" />
                </span>
                <div>
                  <p className="home-support__name">
                    {contact.name}{' '}
                    <a href={`tel:${contact.number}`} aria-label={`Ligar para ${contact.name}, ${contact.number}`}>
                      {contact.number}
                    </a>
                  </p>
                  <p className="home-support__desc">{contact.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-cta" aria-labelledby="home-cta-title">
        <div className="home-container home-cta__inner">
          <div>
            <h2 id="home-cta-title" className="home-cta__title">
              Comece sua avaliação agora
            </h2>
            <p className="home-cta__text">Leva cerca de 5 minutos e você pode consultar o resultado quando quiser.</p>
          </div>
          <InternalLink className="home-button home-button--light" href="/formulario">
            Fazer avaliação
            <LuArrowRight aria-hidden="true" />
          </InternalLink>
        </div>
      </section>
    </main>
  )
}

export default HomePage
