import { useEffect, useRef, useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CoverPage from './pages/CoverPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AccessibilityControls from './components/accessibility/AccessibilityControls.jsx'

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
      })
      return
    }

    if (route.hash && previousPath === '/') {
      const target = document.getElementById(route.hash.replace('#', ''))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    if (!route.hash || cameFromOtherPage) {
      forceScrollTop()
      requestAnimationFrame(() => {
        forceScrollTop()
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
        const targetElement = document.getElementById(nextHash.replace('#', ''))
        targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }

    window.history.pushState({}, '', next)
    setRoute({ path: nextPath, hash: nextHash })
  }

  if (route.path === '/login') {
    return (
      <AccessibilityControls>
        <LoginPage />
      </AccessibilityControls>
    )
  }

  const page =
    route.path === '/sobre-projeto' || route.path === '/cover' ? <CoverPage /> : <HomePage />

  return (
    <AccessibilityControls>
      <Navbar onNavigate={navigate} />
      <div key={`${route.path}${route.hash}`} className="app-page">
        {page}
      </div>
      <Footer />
    </AccessibilityControls>
  )
}

export default App
