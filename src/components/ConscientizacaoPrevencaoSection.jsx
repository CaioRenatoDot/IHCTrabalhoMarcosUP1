import AvaliacaoGratuitaButton from './AvaliacaoGratuitaButton.jsx'
import SaibaMaisButton from './SaibaMaisButton.jsx'

const AWARENESS_TAG = 'CONSCIENTIZAÇÃO E PREVENÇÃO'
const AWARENESS_DESCRIPTION =
  'Uma ferramenta educativa para ajudar você a compreender fatores de risco do câncer de mama, com base em dados e evidências científicas.'

function ConscientizacaoPrevencaoSection() {
  return (
    <section className="awareness-section stagger-fade">
      <div className="awareness-content">
        <div className="awareness-tag">{AWARENESS_TAG}</div>

        <h1 className="awareness-title">
          Entenda seu <span className="awareness-title-highlight">risco</span> antes que ele te surpreenda
        </h1>

        <p className="awareness-description">{AWARENESS_DESCRIPTION}</p>

        <div className="hero-copy__actions awareness-actions">
          <AvaliacaoGratuitaButton />
          <SaibaMaisButton />
        </div>
      </div>
    </section>
  )
}

export default ConscientizacaoPrevencaoSection
