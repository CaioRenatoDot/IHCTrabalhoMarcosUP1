import { useRef, useState } from 'react'
import { LuClock, LuFileText, LuLock, LuUser } from 'react-icons/lu'
import InternalLink from '../InternalLink.jsx'

const FACTS = [
  { icon: LuClock, text: 'Leva cerca de 2 minutos' },
  { icon: LuFileText, text: 'Não realiza diagnóstico' },
  { icon: LuUser, text: 'Você pode sair quando quiser' },
]

const HOW_IT_WORKS = [
  {
    title: 'Responda sobre sinais',
    text: 'Algumas perguntas sobre a sua idade, alterações nas mamas e a última mamografia.',
  },
  {
    title: 'Veja uma orientação clara',
    text: 'Você recebe orientações simples, baseadas no INCA e no Ministério da Saúde.',
  },
  {
    title: 'Saiba onde buscar atendimento',
    text: 'Mostramos como chegar ao atendimento pelo SUS, começando pela unidade básica de saúde.',
  },
]

// Tela "Antes de começar" (P0 em docs/formulario-simplificado-v2.md): explica a ferramenta e pede o aceite.
function IntroStep({ accepted, onAcceptedChange, onContinue }) {
  const [showError, setShowError] = useState(false)
  const checkboxRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!accepted) {
      setShowError(true)
      checkboxRef.current?.focus()
      return
    }

    onContinue()
  }

  const handleChange = (event) => {
    onAcceptedChange(event.target.checked)
    if (event.target.checked) {
      setShowError(false)
    }
  }

  return (
    <div className="signs-intro">
      <div className="signs-intro__main">
        <p className="signs-check__eyebrow">Avaliação educativa</p>
        <h1 className="signs-intro__title">Antes de começar</h1>
        <p className="signs-intro__lead">
          Em poucos passos, você vai responder sobre sinais nas mamas e receber orientações sobre o que fazer a seguir.
        </p>

        <ul className="signs-intro__facts">
          {FACTS.map((fact) => {
            const Icon = fact.icon
            return (
              <li key={fact.text}>
                <span className="signs-check__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span>{fact.text}</span>
              </li>
            )
          })}
        </ul>

        <form className="signs-intro__form" onSubmit={handleSubmit} noValidate>
          <div className={`signs-intro__consent${showError ? ' has-error' : ''}`}>
            <input
              ref={checkboxRef}
              id="signs-consent"
              type="checkbox"
              checked={accepted}
              onChange={handleChange}
              aria-invalid={showError}
              aria-describedby={showError ? 'signs-consent-error' : undefined}
            />
            <label htmlFor="signs-consent">
              Entendo que esta ferramenta oferece orientações gerais e não substitui uma consulta com profissional de
              saúde.
            </label>
          </div>
          {showError ? (
            <p id="signs-consent-error" className="signs-intro__error" role="alert">
              Marque a caixa acima para começar.
            </p>
          ) : null}

          <button type="submit" className="signs-check__button signs-check__button--block">
            Começar
          </button>
        </form>

        <p className="signs-intro__urgent">
          Já notou alguma alteração na mama? Você não precisa terminar a avaliação para procurar atendimento. Veja{' '}
          <InternalLink href="/onde-buscar-ajuda">onde buscar ajuda</InternalLink>.
        </p>
      </div>

      <aside className="signs-intro__aside" aria-labelledby="signs-intro-how">
        <h2 id="signs-intro-how">Como funciona</h2>
        <ol className="signs-intro__how">
          {HOW_IT_WORKS.map((item, index) => (
            <li key={item.title}>
              <span className="signs-check__icon signs-check__icon--number" aria-hidden="true">
                {index + 1}.
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="signs-intro__privacy">
          <span className="signs-intro__privacy-icon" aria-hidden="true">
            <LuLock />
          </span>
          Não pedimos nome, e-mail nem localização exata.
        </p>
      </aside>
    </div>
  )
}

export default IntroStep
