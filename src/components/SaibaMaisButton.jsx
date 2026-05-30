import { handleSpaLinkClick } from '../utils/navigation.js'

function SaibaMaisButton() {
  return (
    <a
      className="hero-copy__secondary"
      href="/#saiba-mais"
      onClick={(event) => handleSpaLinkClick(event, '/#saiba-mais')}
    >
      Saiba mais
    </a>
  )
}

export default SaibaMaisButton
