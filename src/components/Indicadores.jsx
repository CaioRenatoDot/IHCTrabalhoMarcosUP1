import { useEffect, useMemo, useState } from 'react'

const indicadores = [
  { label: 'Casos novos/ano no Brasil', prefix: '+', endValue: 50, suffix: 'k' },
  { label: 'Fatores de risco analisados', endValue: 12 },
  { label: 'Tempo médio do questionário', endValue: 5, suffix: ' min' },
  { label: 'Gratuito e confidencial', endValue: 100, suffix: '%' },
]

function useCountUp(endValue, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setValue(endValue)
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaQuery.matches) {
      setValue(endValue)
      return undefined
    }

    const startTime = performance.now() + delay
    let animationFrameId = 0
    let cancelled = false

    const easeOutCubic = (progress) => 1 - (1 - progress) ** 3

    const animate = (now) => {
      if (cancelled) {
        return
      }

      if (now < startTime) {
        animationFrameId = window.requestAnimationFrame(animate)
        return
      }

      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const nextValue = Math.round(endValue * easeOutCubic(progress))

      setValue(nextValue)

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(animate)
      }
    }

    animationFrameId = window.requestAnimationFrame(animate)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [delay, duration, endValue])

  return value
}

function IndicatorValue({ prefix = '', endValue, suffix = '' }) {
  const animatedValue = useCountUp(endValue, 1200, 120)
  const formattedValue = useMemo(() => `${prefix}${animatedValue}${suffix}`, [animatedValue, prefix, suffix])

  return <div className="indicator-value">{formattedValue}</div>
}

function Indicadores() {
  return (
    <section className="indicator-row" aria-label="Indicadores do projeto">
      <div className="indicator-list">
        {indicadores.map((item, index) => (
          <div
            key={item.label}
            className="indicator-item"
            style={{ '--indicator-delay': `${index * 0.08}s` }}
          >
            <IndicatorValue prefix={item.prefix} endValue={item.endValue} suffix={item.suffix} />
            <div className="indicator-label">{item.label}</div>
            {index < indicadores.length - 1 && <span className="indicator-separator" />}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Indicadores
