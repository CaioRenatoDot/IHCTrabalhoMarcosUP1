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
import WarningSignsPage from './pages/WarningSignsPage.jsx'
import MammographyPage from './pages/MammographyPage.jsx'
import HelpPage from './pages/HelpPage.jsx'
import FaqPage from './pages/FaqPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import SignsCheckPage from './pages/SignsCheckPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AccessibilityControls from './components/accessibility/AccessibilityControls.jsx'
import SkipLink from './components/SkipLink.jsx'
import SmoothScrollProvider from './components/smooth-scroll/SmoothScrollProvider.jsx'
import RouteLoadingPage from './components/RouteLoadingPage.jsx'
import { useAuth } from './contexts/AuthContext.jsx'

// Abertura do site: logo sendo desenhada com "Carregando…" e, ao terminar, o nome RiskCare surgindo.
// Em produção roda só na primeira visita da sessão; em desenvolvimento roda sempre, com um tempo mínimo
// (TEMPORÁRIO, para visualizar a animação; remover quando não for mais útil — FR-28).
const INTRO_MIN_MS = import.meta.env.DEV ? 3500 : 0
const INTRO_REVEAL_MS = 1100
const INTRO_SEEN_KEY = 'riskcare:intro-seen'

function shouldPlayIntro() {
  if (import.meta.env.DEV) {
    return true
  }

  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) !== '1'
  } catch {
    return false
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, '1')
  } catch {
    // Sem armazenamento disponível: a abertura pode repetir, o que não quebra nada.
  }
}

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
  const { latestAssessmentLoading, session, loading: authLoading } = useAuth()
  // 'loading' → 'reveal' (nome aparece) → 'done'
  const [introPhase, setIntroPhase] = useState(() => (shouldPlayIntro() ? 'loading' : 'done'))
  const [introMinElapsed, setIntroMinElapsed] = useState(INTRO_MIN_MS === 0)

  useEffect(() => {
    if (introMinElapsed) {
      return undefined
    }

    const timer = window.setTimeout(() => setIntroMinElapsed(true), INTRO_MIN_MS)
    return () => window.clearTimeout(timer)
  }, [introMinElapsed])

  useEffect(() => {
    if (introPhase === 'loading' && introMinElapsed && !authLoading) {
      setIntroPhase('reveal')
      return undefined
    }

    if (introPhase !== 'reveal') {
      return undefined
    }

    const timer = window.setTimeout(() => {
      markIntroSeen()
      setIntroPhase('done')
    }, INTRO_REVEAL_MS)
    return () => window.clearTimeout(timer)
  }, [authLoading, introMinElapsed, introPhase])

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
  } else if (route.path === '/sinais-de-alerta') {
    page = <WarningSignsPage />
  } else if (route.path === '/mamografia') {
    page = <MammographyPage />
  } else if (route.path === '/onde-buscar-ajuda') {
    page = <HelpPage />
  } else if (route.path === '/perguntas-frequentes') {
    page = <FaqPage />
  } else if (route.path === '/noticias') {
    page = <NewsPage />
  } else if (route.path === '/verificar-sinais') {
    page = <SignsCheckPage />
    showNavbar = false
    showFooter = false
  } else if (route.path === '/resultados') {
    page = <ResultsPage />
    showNavbar = false
    showFooter = false
  } else {
    page = <HomePage />
  }

  const shouldShowAuthLoader =
    (authLoading && (AUTH_ROUTES.has(route.path) || PROTECTED_ROUTES.has(route.path))) ||
    (latestAssessmentLoading && PROTECTED_ROUTES.has(route.path) && Boolean(session)) ||
    (PROTECTED_ROUTES.has(route.path) && !session) ||
    (AUTH_ROUTES.has(route.path) && Boolean(session))
  const pageTransitionKey = route.path

  if (introPhase !== 'done') {
    page = <RouteLoadingPage label="Carregando" revealed={introPhase === 'reveal'} />
    showNavbar = false
    showFooter = false
  } else if (shouldShowAuthLoader) {
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
            <div key={pageTransitionKey} className="page-shell__transition">
              {page}
            </div>
          </div>
          {showFooter ? <Footer /> : null}
        </div>
      </AccessibilityControls>
    </SmoothScrollProvider>
  )
}

export default App
