import { useCallback, useEffect, useRef, useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import SignupSuccessPage from './pages/SignupSuccessPage.jsx'
import CoverPage from './pages/CoverPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ToastContainer from './components/ToastContainer.jsx'
import AccessibilityControls from './components/accessibility/AccessibilityControls.jsx'
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

function updateRouteWithTransition(nextRoute, setRoute) {
  setRoute(nextRoute)
}

function App() {
  const [route, setRoute] = useState(parseLocation)
  const [toasts, setToasts] = useState([])
  const previousPathRef = useRef(route.path)
  const toastTimersRef = useRef(new Map())
  const pageKey = route.path

  const removeToast = useCallback((id) => {
    const timers = toastTimersRef.current.get(id)

    if (timers) {
      clearTimeout(timers.leaveTimer)
      clearTimeout(timers.removeTimer)
      toastTimersRef.current.delete(id)
    }

    setToasts((previousToasts) => previousToasts.filter((toast) => toast.id !== id))
  }, [])

  const dismissToast = useCallback(
    (id) => {
      setToasts((previousToasts) =>
        previousToasts.map((toast) => (toast.id === id ? { ...toast, isLeaving: true } : toast))
      )

      const currentTimers = toastTimersRef.current.get(id)

      if (!currentTimers) {
        const removeTimer = setTimeout(() => removeToast(id), 300)
        toastTimersRef.current.set(id, { leaveTimer: null, removeTimer })
        return
      }

      if (currentTimers.leaveTimer) {
        clearTimeout(currentTimers.leaveTimer)
      }

      if (!currentTimers.removeTimer) {
        currentTimers.removeTimer = setTimeout(() => removeToast(id), 300)
      }

      toastTimersRef.current.set(id, currentTimers)
    },
    [removeToast]
  )

  const showToast = useCallback(
    (message) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
      setToasts((previousToasts) => [...previousToasts, { id, message, isLeaving: false }])

      const leaveTimer = setTimeout(() => {
        dismissToast(id)
      }, 3000)

      toastTimersRef.current.set(id, { leaveTimer, removeTimer: null })
    },
    [dismissToast]
  )

  useEffect(() => {
    window.history.scrollRestoration = 'manual'

    const syncRoute = () => {
      const nextRoute = parseLocation()
      updateRouteWithTransition(nextRoute, setRoute)
    }

    window.addEventListener('popstate', syncRoute)
    window.addEventListener('hashchange', syncRoute)

    return () => {
      window.removeEventListener('popstate', syncRoute)
      window.removeEventListener('hashchange', syncRoute)
    }
  }, [])

  useEffect(
    () => () => {
      toastTimersRef.current.forEach((timers) => {
        clearTimeout(timers.leaveTimer)
        clearTimeout(timers.removeTimer)
      })
      toastTimersRef.current.clear()
    },
    []
  )

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
    updateRouteWithTransition({ path: nextPath, hash: nextHash }, setRoute)
  }

  const hideNavbar = route.path === '/login' || route.path === '/cadastro' || route.path === '/sucesso-cadastro'

  let page = route.path === '/sobre-projeto' || route.path === '/cover' ? <CoverPage /> : <HomePage />

  if (route.path === '/login') {
    page = <LoginPage onToast={showToast} />
  } else if (route.path === '/cadastro') {
    page = <SignupPage onToast={showToast} />
  } else if (route.path === '/sucesso-cadastro') {
    page = <SignupSuccessPage onToast={showToast} />
  }

  return (
    <AccessibilityControls>
      <SkipLink />
      {!hideNavbar ? <Navbar onNavigate={navigate} currentPath={route.path} /> : null}
      <div className="app-page" key={pageKey}>
        {page}
      </div>
      <Footer />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </AccessibilityControls>
  )
}

export default App
