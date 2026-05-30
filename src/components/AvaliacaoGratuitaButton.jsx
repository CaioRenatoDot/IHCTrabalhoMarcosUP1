import { handleSpaLinkClick } from '../utils/navigation.js'

function AvaliacaoGratuitaButton() {
  return (
    <a
      className="hero-copy__primary"
      href="/login"
      onClick={(event) => handleSpaLinkClick(event, '/login')}
    >
      {'Iniciar avalia\u00E7\u00E3o gratuita'}
    </a>
  )
}

export default AvaliacaoGratuitaButton
