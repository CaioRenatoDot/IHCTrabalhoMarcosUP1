export function navigateWithoutReload(href) {
  const target = new URL(href, window.location.origin)
  const nextPath = target.pathname.toLowerCase()
  const nextHash = target.hash
  const currentPath = window.location.pathname.toLowerCase()
  const currentHash = window.location.hash

  if (currentPath === nextPath && currentHash === nextHash) {
    return
  }

  window.history.pushState({}, '', `${nextPath}${nextHash}`)
  window.dispatchEvent(new Event('popstate'))
}

export function handleSpaLinkClick(event, href) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return
  }

  event.preventDefault()
  navigateWithoutReload(href)
}
