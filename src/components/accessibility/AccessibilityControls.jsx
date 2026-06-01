import { useEffect, useState } from 'react'
import TextZoomControls from './TextZoomControls.jsx'
import VLibrasWidget from './VLibrasWidget.jsx'

const MIN_FONT_SCALE = 0.95
const MAX_FONT_SCALE = 1.1
const FONT_SCALE_STEP = 0.05
const FONT_SCALE_STORAGE_KEY = 'riskcare:accessibility-font-scale'
const HIGH_CONTRAST_STORAGE_KEY = 'riskcare:accessibility-high-contrast'
const MAGNIFIER_OFFSET = 18
const MAGNIFIER_EDGE_GAP = 16
const MAGNIFIER_MAX_WIDTH = 340
const MAGNIFIER_ESTIMATED_HEIGHT = 130

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

function getMagnifierPosition(clientX, clientY) {
  const maxX = Math.max(
    MAGNIFIER_EDGE_GAP,
    window.innerWidth - MAGNIFIER_MAX_WIDTH - MAGNIFIER_EDGE_GAP,
  )
  const preferredX = clientX + MAGNIFIER_OFFSET
  const x = Math.min(Math.max(MAGNIFIER_EDGE_GAP, preferredX), maxX)

  const preferredY = clientY + MAGNIFIER_OFFSET
  const shouldPlaceAbove =
    preferredY + MAGNIFIER_ESTIMATED_HEIGHT > window.innerHeight
  const nextY = shouldPlaceAbove
    ? clientY - MAGNIFIER_ESTIMATED_HEIGHT - MAGNIFIER_OFFSET
    : preferredY

  return {
    x,
    y: Math.max(MAGNIFIER_EDGE_GAP, nextY),
  }
}

function AccessibilityControls({ children }) {
  const [fontScale, setFontScale] = useState(getInitialFontScale)
  const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false)
  const [isVLibrasEnabled, setIsVLibrasEnabled] = useState(false)
  const [isVLibrasPanelOpen, setIsVLibrasPanelOpen] = useState(false)
  const [isHighContrastEnabled, setIsHighContrastEnabled] = useState(
    () => localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY) === 'true',
  )
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

  useEffect(() => {
    localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(isHighContrastEnabled))
  }, [isHighContrastEnabled])

  const hideMagnifier = () => {
    setMagnifier((currentState) => ({ ...currentState, isVisible: false }))
  }

  const updateMagnifier = (event) => {
    if (!isMagnifierEnabled) {
      return
    }

    const cleanText = findMagnifierText(event.target, event.currentTarget)

    if (!cleanText) {
      hideMagnifier()
      return
    }

    const position = getMagnifierPosition(event.clientX, event.clientY)

    setMagnifier({
      isVisible: true,
      text: cleanText.slice(0, 120),
      x: position.x,
      y: position.y,
    })
  }

  const handleMagnifierPointerMove = (event) => {
    if (event.pointerType === 'mouse') {
      updateMagnifier(event)
    }
  }

  const handleMagnifierPointerDown = (event) => {
    if (event.pointerType !== 'mouse') {
      updateMagnifier(event)
    }
  }

  return (
    <div
      className={`accessibility-root${isHighContrastEnabled ? ' is-high-contrast' : ''}`}
      style={{ '--accessibility-font-scale': fontScale }}
      onPointerMove={handleMagnifierPointerMove}
      onPointerDown={handleMagnifierPointerDown}
      onPointerLeave={hideMagnifier}
    >
      {children}

      <TextZoomControls
        fontScale={fontScale}
        minFontScale={MIN_FONT_SCALE}
        maxFontScale={MAX_FONT_SCALE}
        isMagnifierEnabled={isMagnifierEnabled}
        isHighContrastEnabled={isHighContrastEnabled}
        onDecrease={decreaseFontScale}
        onReset={() => setFontScale(1)}
        onIncrease={increaseFontScale}
        onToggleMagnifier={() => {
          setIsMagnifierEnabled((currentValue) => !currentValue)
          hideMagnifier()
        }}
        onToggleHighContrast={() => {
          setIsHighContrastEnabled((currentValue) => !currentValue)
        }}
        isVLibrasEnabled={isVLibrasEnabled}
        isVLibrasPanelOpen={isVLibrasPanelOpen}
        onToggleVLibras={() => {
          setIsVLibrasEnabled((currentValue) => !currentValue)
        }}
      />

      <VLibrasWidget
        enabled={isVLibrasEnabled}
        onPanelOpenChange={(isOpen) => {
          setIsVLibrasPanelOpen(isOpen)
        }}
      />

      {isMagnifierEnabled && magnifier.isVisible ? (
        <div
          className="text-magnifier"
          style={{
            left: magnifier.x,
            top: magnifier.y,
          }}
        >
          {magnifier.text}
        </div>
      ) : null}
    </div>
  )
}

export default AccessibilityControls
