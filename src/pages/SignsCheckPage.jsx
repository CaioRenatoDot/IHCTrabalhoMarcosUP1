import { useState } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import InternalLink from '../components/InternalLink.jsx'
import RiskCareLogo from '../components/RiskCareLogo.jsx'
import IntroStep from '../components/signs-check/IntroStep.jsx'

const STEPS = [
  { id: 'intro', label: 'Antes de começar' },
  { id: 'about', label: 'Sobre você' },
  { id: 'signs', label: 'Sinais nas mamas' },
  { id: 'screening', label: 'Mamografia' },
]

// A tela inicial mostra só um começo de barra; as etapas 1 a 3 preenchem até 75%, e o resultado completa.
function getProgress(stepIndex) {
  return stepIndex === 0 ? 6 : Math.round((stepIndex / STEPS.length) * 100)
}

// Verificação de sinais (FM-40): fluxo público, sem login e sem score. Spec em docs/formulario-simplificado-v2.md.
function SignsCheckPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [accepted, setAccepted] = useState(false)

  const step = STEPS[stepIndex]
  const progress = getProgress(stepIndex)
  const stepCounter = stepIndex > 0 ? `Etapa ${stepIndex} de ${STEPS.length - 1}` : null

  return (
    <>
      <header className="signs-header">
        <div className="signs-header__inner">
          <InternalLink className="signs-header__brand" href="/">
            <RiskCareLogo animated className="signs-header__logo rc-logo--loop-slow" />
            <span>RiskCare</span>
          </InternalLink>
          <InternalLink className="signs-header__exit" href="/">
            Sair da avaliação
          </InternalLink>
        </div>
      </header>

      <main id="main-content" className="signs-check" tabIndex={-1}>
        <div className="signs-check__container">
          <div className="signs-progress">
            <div className="signs-progress__labels">
              <span>{step.label}</span>
              {stepCounter ? <span>{stepCounter}</span> : null}
            </div>
            <div
              className="signs-progress__track"
              role="progressbar"
              aria-label="Progresso da avaliação"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-valuetext={stepCounter ? `${step.label}, ${stepCounter.toLowerCase()}` : step.label}
            >
              <span className="signs-progress__fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {step.id === 'intro' ? (
            <IntroStep accepted={accepted} onAcceptedChange={setAccepted} onContinue={() => setStepIndex(1)} />
          ) : (
            // Provisório: as etapas seguintes entram nos próximos commits desta branch.
            <section className="signs-pending" aria-labelledby="signs-pending-title">
              <h1 id="signs-pending-title">{step.label}</h1>
              <p>Esta etapa ainda está em construção.</p>
              <button
                type="button"
                className="signs-check__button signs-check__button--outline"
                onClick={() => setStepIndex(0)}
              >
                <LuArrowLeft aria-hidden="true" />
                Voltar
              </button>
            </section>
          )}
        </div>
      </main>
    </>
  )
}

export default SignsCheckPage
