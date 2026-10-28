import { LuArrowRight, LuPhone, LuTriangleAlert } from 'react-icons/lu'
import InternalLink from '../components/InternalLink.jsx'

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
    text: 'Entre ou crie sua conta e responda a perguntas sobre idade, histórico pessoal e familiar, fatores hormonais e hábitos. Leva cerca de 5 minutos.',
  },
  {
    title: 'Veja seu resultado',
    text: 'Você recebe uma estimativa educativa e vê quais fatores mais pesaram nas suas respostas.',
  },
  {
    title: 'Converse com um profissional',
    text: 'Leve o resultado para a sua consulta e tire dúvidas com quem acompanha a sua saúde.',
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

const INCA_BOOKLET_URL =
  'https://ninho.inca.gov.br/jspui/bitstream/123456789/18158/1/cartilha-mama-2026%20-%20DefesoEleitoral.pdf'

function HomePage() {
  return (
    <main id="main-content" className="home-page" tabIndex={-1}>
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-container home-hero__grid">
          <div className="home-hero__content">
            <p className="home-eyebrow">Avaliação educativa de risco</p>
            <h1 id="home-hero-title" className="home-hero__title">
              Entenda seus fatores de risco para o câncer de mama
            </h1>
            <p className="home-hero__lead">
              Responda a perguntas sobre sua saúde, seu histórico familiar e seus hábitos e receba orientações claras,
              baseadas em fontes oficiais.
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
            <p className="home-hero__note">Gratuito. Não substitui consulta médica.</p>
          </div>

          <div className="home-hero__visual" aria-hidden="true">
            <img src="/riskcare_logo.png" alt="" />
          </div>
        </div>
      </section>

      <section id="sinais" className="home-block home-block--surface" aria-labelledby="sinais-title" tabIndex={-1}>
        <div className="home-container home-signs">
          <div className="home-block__header">
            <h2 id="sinais-title" className="section-title">
              Sinais que merecem avaliação
            </h2>
            <p className="section-sub">
              Conhecer o próprio corpo ajuda a perceber mudanças. Fique atenta a estas alterações:
            </p>
          </div>

          <ul className="home-signs__list">
            {WARNING_SIGNS.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>

          <div className="home-callout" role="note">
            <LuTriangleAlert className="home-callout__icon" aria-hidden="true" />
            <p>
              Se você notar alguma dessas alterações, <strong>procure uma unidade de saúde</strong> para avaliação. A
              maioria das alterações não é câncer, mas todas devem ser investigadas.
            </p>
          </div>

          <p className="home-source">
            Fonte:{' '}
            <a href={INCA_BOOKLET_URL} target="_blank" rel="noopener noreferrer">
              INCA, Câncer de mama: vamos falar sobre isso? (2026)
            </a>
          </p>
        </div>
      </section>

      <section id="como-funciona" className="home-block" aria-labelledby="como-funciona-title" tabIndex={-1}>
        <div className="home-container">
          <div className="home-block__header">
            <h2 id="como-funciona-title" className="section-title">
              Como funciona
            </h2>
            <p className="section-sub">Três passos para entender melhor seus fatores de risco.</p>
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

          <InternalLink className="home-button home-button--primary home-steps__cta" href="/formulario">
            Começar agora
            <LuArrowRight aria-hidden="true" />
          </InternalLink>
        </div>
      </section>

      <section id="apoio" className="home-block home-block--surface" aria-labelledby="apoio-title" tabIndex={-1}>
        <div className="home-container home-support">
          <div className="home-block__header">
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
                <LuPhone className="home-support__icon" aria-hidden="true" />
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
    </main>
  )
}

export default HomePage
