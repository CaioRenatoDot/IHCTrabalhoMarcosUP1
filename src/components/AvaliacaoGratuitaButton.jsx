import { useAuth } from '../contexts/AuthContext.jsx'
import InternalLink from './InternalLink.jsx'

function AvaliacaoGratuitaButton() {
  const { session } = useAuth()

  return (
    <InternalLink
      className="hero-copy__primary"
      href={session ? '/formulario' : '/cadastro'}
    >
      {'Iniciar avalia\u00E7\u00E3o gratuita'}
    </InternalLink>
  )
}

export default AvaliacaoGratuitaButton
