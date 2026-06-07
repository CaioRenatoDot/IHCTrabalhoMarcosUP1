import { handleSpaLinkClick } from '../utils/navigation.js'
import { useAuth } from '../contexts/AuthContext.jsx'

function AvaliacaoGratuitaButton() {
  const { session } = useAuth()

  return (
    <a
      className="hero-copy__primary"
      href={session ? '/formulario' : '/cadastro'}
      onClick={(event) => handleSpaLinkClick(event, session ? '/formulario' : '/cadastro')}
    >
      {'Iniciar avalia\u00E7\u00E3o gratuita'}
    </a>
  )
}

export default AvaliacaoGratuitaButton
