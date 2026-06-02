import { handleSpaLinkClick } from '../utils/navigation.js'

function SaibaMaisButton() {
  return (
    <a
      className="hero-copy__secondary"
      href="/login"
      onClick={(event) => handleSpaLinkClick(event, '/login')}
    >
      Saiba mais
    </a>
  )
}

export default SaibaMaisButton
