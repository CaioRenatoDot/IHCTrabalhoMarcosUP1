import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

function SmoothScrollProvider({ children }) {
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
      {children}
    </ReactLenis>
  )
}

export default SmoothScrollProvider
