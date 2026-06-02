import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import AvaliacaoGratuitaButton from './AvaliacaoGratuitaButton.jsx'
import SaibaMaisButton from './SaibaMaisButton.jsx'

gsap.registerPlugin(useGSAP)

const RISK_PERCENTAGE = 32

function ConscientizacaoPrevencaoSection() {
  const riskCardRef = useRef(null)
  const [riskPercentage, setRiskPercentage] = useState(0)

  useGSAP(() => {
    if (!riskCardRef.current) {
      return
    }

    const animatedRisk = { value: 0 }
    gsap.to(animatedRisk, {
      value: RISK_PERCENTAGE,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        const nextPercentage = Math.round(animatedRisk.value)

        setRiskPercentage(nextPercentage)
        riskCardRef.current.style.setProperty('--risk-progress', `${nextPercentage}%`)
      },
    })
  }, { scope: riskCardRef })

  return (
    <section className="awareness-section">
      <div className="awareness-content">
        <div className="awareness-tag">CONSCIENTIZAÇÃO E PREVENÇÃO</div>

        <h1 className="awareness-title">
          Entenda seu <span className="awareness-title-highlight">risco</span> antes que ele te surpreenda
        </h1>

        <p className="awareness-description">
          Uma ferramenta educativa para ajudar você a compreender fatores de risco do câncer de
          mama, com base em dados e evidências científicas.
        </p>

        <div className="hero-copy__actions awareness-actions">
          <AvaliacaoGratuitaButton />
          <SaibaMaisButton />
        </div>
      </div>

      <aside
        ref={riskCardRef}
        className="risk-card"
        aria-label="Estimativa de risco"
        style={{ '--risk-progress': '0%' }}
      >
        <h2 className="risk-card__title">SUA ESTIMATIVA DE RISCO</h2>

        <div className="risk-card__ring-wrap" aria-hidden="true">
          <div className="risk-card__ring">
            <div className="risk-card__value">{riskPercentage}%</div>
          </div>
        </div>

        <p className="risk-card__level">Risco moderado estimado</p>

        <div className="risk-card__rows">
          <div className="risk-card__row">
            <span>Histórico familiar</span>
            <strong className="risk-high">Alto</strong>
          </div>
          <div className="risk-card__row">
            <span>Estilo de vida</span>
            <strong className="risk-low">Baixo</strong>
          </div>
          <div className="risk-card__row">
            <span>Fator hormonal</span>
            <strong className="risk-medium">Moderado</strong>
          </div>
        </div>
      </aside>
    </section>
  )
}

export default ConscientizacaoPrevencaoSection
