import { useEffect, useRef, useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CoverPage from './pages/CoverPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SkipLink from './components/SkipLink.jsx'

function parseLocation() {
  return {
    path: window.location.pathname.toLowerCase(),
    hash: window.location.hash || '',
  }
}

function forceScrollTop() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function focusElementById(id) {
  if (!id) {
    return
  }

  const target = document.getElementById(id)

  if (!target) {
    return
  }

  requestAnimationFrame(() => {
    target.focus({ preventScroll: true })
  })
}

function App() {
  const [route, setRoute] = useState(parseLocation)
  const previousPathRef = useRef(route.path)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    const syncRoute = () => setRoute(parseLocation())

    window.addEventListener('popstate', syncRoute)
    window.addEventListener('hashchange', syncRoute)

    return () => {
      window.removeEventListener('popstate', syncRoute)
      window.removeEventListener('hashchange', syncRoute)
    }
  }, [])

  useEffect(() => {
    const isHome = route.path === '/'
    const cameFromOtherPage = previousPathRef.current !== route.path
    const previousPath = previousPathRef.current
    previousPathRef.current = route.path

    if (!isHome) {
      forceScrollTop()
      requestAnimationFrame(() => {
        forceScrollTop()
        focusElementById('main-content')
      })
      return
    }

    if (route.hash && previousPath === '/') {
      const targetId = route.hash.replace('#', '')
      const target = document.getElementById(targetId)

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        focusElementById(targetId)
        return
      }
    }

    if (!route.hash || cameFromOtherPage) {
      forceScrollTop()
      requestAnimationFrame(() => {
        forceScrollTop()
        focusElementById('main-content')
      })
    }
  }, [route.path, route.hash])

  const navigate = (href) => {
    const target = new URL(href, window.location.origin)
    const nextPath = target.pathname.toLowerCase()
    const nextHash = target.hash
    const current = `${route.path}${route.hash}`
    const next = `${nextPath}${nextHash}`

    if (current === next) {
      if (nextHash) {
        const targetId = nextHash.replace('#', '')
        const targetElement = document.getElementById(targetId)
        targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        focusElementById(targetId)
      }
      return
    }

    window.history.pushState({}, '', next)
    setRoute({ path: nextPath, hash: nextHash })
  }

  if (route.path === '/login') {
    return <LoginPage />
  }

  const page =
    route.path === '/sobre-projeto' || route.path === '/cover' ? <CoverPage /> : <HomePage />

  return (
    <>
      <SkipLink />
      <Navbar onNavigate={navigate} />
      <div key={`${route.path}${route.hash}`} className="app-page">
        {page}
      </div>
      <Footer />
    </>
  )
}

export default App
