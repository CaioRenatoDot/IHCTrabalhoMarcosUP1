import FeatureCard from '../components/FeatureCard.jsx'
import Indicadores from '../components/Indicadores.jsx'
import ObservationBanner from '../components/ObservationBanner.jsx'
import ConscientizacaoPrevencaoSection from '../components/ConscientizacaoPrevencaoSection.jsx'
import HowItWorksSection from '../components/HowItWorksSection.jsx'

const ClipboardCheckIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 14l2 2 4-4" />
  </svg>
)

const QuestionIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const TrendLineIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="M7 16l4-8 4 4 4-6" />
  </svg>
)

function HomePage() {
  const stagger = (index) => ({ '--stagger-index': index })

  return (
    <main id="main-content" className="wireframe-page" tabIndex={-1}>
      <section
        id="avaliacao"
        className="home-section home-section--hero stagger-fade"
        tabIndex={-1}
        style={stagger(0)}
      >
        <div className="home-section__inner">
          <ConscientizacaoPrevencaoSection />
        </div>
      </section>

      <section
        id="saiba-mais"
        className="home-section home-section--metrics stagger-fade"
        tabIndex={-1}
        aria-labelledby="fatores-de-risco-heading"
        style={stagger(1)}
      >
        <div className="home-section__inner">
          <h2 id="fatores-de-risco-heading" className="visually-hidden">
            Fatores de risco
          </h2>
          <div id="fatores-de-risco">
            <Indicadores />
          </div>
        </div>
      </section>

      <section className="home-section home-section--cards stagger-fade" style={stagger(2)}>
        <div className="home-section__inner">
          <section className="cards-block">
            <div className="cards-block__grid">
              <div>
                <FeatureCard
                  icon={<ClipboardCheckIcon />}
                  title={'An\u00E1lise r\u00E1pida'}
                  description={
                    'Responda um breve question\u00E1rio e receba uma estimativa preliminar sobre seus fatores de risco.'
                  }
                />
              </div>
              <div>
                <FeatureCard
                  icon={<QuestionIcon />}
                  title={'Question\u00E1rio detalhado'}
                  description={
                    'An\u00E1lise aprofundada considerando hist\u00F3rico familiar, h\u00E1bitos e caracter\u00EDsticas pessoais.'
                  }
                />
              </div>
              <div>
                <FeatureCard
                  icon={<TrendLineIcon />}
                  title={'Estat\u00EDsticas de risco'}
                  description={
                    'Visualize seus resultados com gr\u00E1ficos claros e orienta\u00E7\u00F5es personalizadas para cada perfil.'
                  }
                />
              </div>
            </div>
          </section>
        </div>
      </section>

      <section
        id="como-funciona"
        className="home-section home-section--how stagger-fade"
        style={stagger(3)}
      >
        <div className="home-section__inner">
          <HowItWorksSection />
        </div>
      </section>

      <section
        id="sobre"
        className="home-section home-section--notice stagger-fade"
        style={stagger(4)}
      >
        <div className="home-section__inner">
          <ObservationBanner />
        </div>
      </section>
    </main>
  )
}

export default HomePage
