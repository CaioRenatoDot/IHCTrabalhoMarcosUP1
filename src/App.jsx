import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import SignupSuccessPage from './pages/SignupSuccessPage.jsx'
import CoverPage from './pages/CoverPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import AssessmentFormPage from './pages/AssessmentFormPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AccessibilityControls from './components/accessibility/AccessibilityControls.jsx'
import SkipLink from './components/SkipLink.jsx'
import SmoothScrollProvider from './components/smooth-scroll/SmoothScrollProvider.jsx'
import RouteLoadingPage from './components/RouteLoadingPage.jsx'
import { useAuth } from './contexts/AuthContext.jsx'

const AUTH_ROUTES = new Set(['/login', '/cadastro'])
const PROTECTED_ROUTES = new Set(['/formulario', '/resultados'])

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
  const { session, loading: authLoading } = useAuth()

  const navigate = useCallback(
    (href) => {
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
    },
    [route.hash, route.path],
  )

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

  useLayoutEffect(() => {
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

  useEffect(() => {
    if (authLoading) {
      return
    }

    if (PROTECTED_ROUTES.has(route.path) && !session) {
      navigate('/login')
      return
    }

    if (AUTH_ROUTES.has(route.path) && session) {
      navigate('/formulario')
    }
  }, [authLoading, navigate, route.path, session])

  let page
  let showNavbar = true
  let showFooter = true

  if (route.path === '/login') {
    page = <LoginPage />
    showNavbar = false
    showFooter = false
  } else if (route.path === '/cadastro') {
    page = <SignupPage />
    showNavbar = false
    showFooter = false
  } else if (route.path === '/sucesso-cadastro') {
    page = <SignupSuccessPage />
    showNavbar = false
    showFooter = false
  } else if (route.path === '/termos-de-uso') {
    page = <TermsPage />
    showNavbar = false
  } else if (route.path === '/politica-de-privacidade') {
    page = <PrivacyPage />
    showNavbar = false
  } else if (route.path === '/formulario') {
    page = <AssessmentFormPage />
    showNavbar = false
    showFooter = false
  } else if (route.path === '/sobre-projeto' || route.path === '/cover') {
    page = <CoverPage />
  } else if (route.path === '/resultados') {
    page = <ResultsPage />
    showNavbar = false
    showFooter = false
  } else {
    page = <HomePage />
  }

  const shouldShowAuthLoader =
    (authLoading && (AUTH_ROUTES.has(route.path) || PROTECTED_ROUTES.has(route.path))) ||
    (PROTECTED_ROUTES.has(route.path) && !session) ||
    (AUTH_ROUTES.has(route.path) && Boolean(session))

  if (shouldShowAuthLoader) {
    page = <RouteLoadingPage label="Verificando acesso" />
    showNavbar = false
    showFooter = false
  }

  return (
    <SmoothScrollProvider routeKey={route.path}>
      <AccessibilityControls>
        <SkipLink />
        <div className="app-page">
          {showNavbar ? <Navbar onNavigate={navigate} currentPath={route.path} /> : null}
          <div className="page-shell">
            {page}
          </div>
          {showFooter ? <Footer /> : null}
        </div>
      </AccessibilityControls>
    </SmoothScrollProvider>
  )
}

export default App
