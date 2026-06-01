import { handleSpaLinkClick } from '../utils/navigation.js'

function AvaliacaoGratuitaButton() {
  return (
    <a
      className="hero-copy__primary"
      href="/cadastro"
      onClick={(event) => handleSpaLinkClick(event, '/cadastro')}
    >
      {'Iniciar avalia\u00E7\u00E3o gratuita'}
    </a>
  )
}

export default AvaliacaoGratuitaButton
