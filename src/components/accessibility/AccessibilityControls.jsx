import { useEffect, useState } from 'react'
import TextZoomControls from './TextZoomControls.jsx'

const MIN_FONT_SCALE = 0.85
const MAX_FONT_SCALE = 1.5
const FONT_SCALE_STEP = 0.15
const FONT_SCALE_STORAGE_KEY = 'riskcare:accessibility-font-scale'

function clampFontScale(value) {
  return Math.min(MAX_FONT_SCALE, Math.max(MIN_FONT_SCALE, value))
}

function getInitialFontScale() {
  const savedFontScale = localStorage.getItem(FONT_SCALE_STORAGE_KEY)
  const parsedFontScale = Number(savedFontScale)

  if (!Number.isFinite(parsedFontScale)) {
    return 1
  }

  return clampFontScale(parsedFontScale)
}

function getElementText(element) {
  if (element instanceof HTMLInputElement) {
    return element.value || element.placeholder
  }

  return Array.from(element.childNodes)
    .filter((node) => node.nodeType === 3)
    .map((node) => node.textContent)
    .join(' ')
}

function findMagnifierText(target, rootElement) {
  if (!(target instanceof Element)) {
    return ''
  }

  let currentElement = target

  while (currentElement && currentElement !== rootElement) {
    if (currentElement.closest('.text-zoom-controls')) {
      return ''
    }

    const text = getElementText(currentElement).replace(/\s+/g, ' ').trim()

    if (text) {
      return text
    }

    currentElement = currentElement.parentElement
  }

  return ''
}

function AccessibilityControls({ children }) {
  const [fontScale, setFontScale] = useState(getInitialFontScale)
  const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false)
  const [magnifier, setMagnifier] = useState({
    isVisible: false,
    text: '',
    x: 0,
    y: 0,
  })

  const decreaseFontScale = () => {
    setFontScale((currentScale) =>
      clampFontScale(Number((currentScale - FONT_SCALE_STEP).toFixed(2))),
    )
  }

  const increaseFontScale = () => {
    setFontScale((currentScale) =>
      clampFontScale(Number((currentScale + FONT_SCALE_STEP).toFixed(2))),
    )
  }

  useEffect(() => {
    localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(fontScale))
  }, [fontScale])

  const hideMagnifier = () => {
    setMagnifier((currentState) => ({ ...currentState, isVisible: false }))
  }

  const handleMagnifierMove = (event) => {
    if (!isMagnifierEnabled) {
      return
    }

    const cleanText = findMagnifierText(event.target, event.currentTarget)

    if (!cleanText) {
      hideMagnifier()
      return
    }

    setMagnifier({
      isVisible: true,
      text: cleanText.slice(0, 120),
      x: event.clientX + 18,
      y: event.clientY + 18,
    })
  }

  return (
    <div
      className="accessibility-root"
      style={{ '--accessibility-font-scale': fontScale }}
      onMouseMove={handleMagnifierMove}
      onMouseLeave={hideMagnifier}
    >
      <TextZoomControls
        fontScale={fontScale}
        minFontScale={MIN_FONT_SCALE}
        maxFontScale={MAX_FONT_SCALE}
        isMagnifierEnabled={isMagnifierEnabled}
        onDecrease={decreaseFontScale}
        onReset={() => setFontScale(1)}
        onIncrease={increaseFontScale}
        onToggleMagnifier={() => {
          setIsMagnifierEnabled((currentValue) => !currentValue)
          hideMagnifier()
        }}
      />

      {isMagnifierEnabled && magnifier.isVisible && (
        <div
          className="text-magnifier"
          style={{
            left: magnifier.x,
            top: magnifier.y,
          }}
        >
          {magnifier.text}
        </div>
      )}

      {children}
    </div>
  )
}

export default AccessibilityControls
