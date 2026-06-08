import { handleSpaLinkClick } from '../utils/navigation.js'

function InternalLink({ children, href, onClick, ...props }) {
  const handleClick = (event) => {
    if (typeof onClick === 'function') {
      onClick(event)
      if (event.defaultPrevented) {
        return
      }
    }

    handleSpaLinkClick(event, href)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export default InternalLink
