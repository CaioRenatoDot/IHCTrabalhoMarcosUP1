import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

function RouteScrollReset({ routeKey }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) {
      return
    }

    lenis.scrollTo(0, {
      immediate: true,
      force: true,
    })
  }, [lenis, routeKey])

  return null
}

function SmoothScrollProvider({ children, routeKey }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <RouteScrollReset routeKey={routeKey} />
      {children}
    </ReactLenis>
  )
}

export default SmoothScrollProvider
