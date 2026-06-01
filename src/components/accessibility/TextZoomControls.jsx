import { useCallback, useEffect, useId, useRef, useState } from 'react'

function GlobeIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 0 0 20V2z" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ContrastIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 0 0 20V2z" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  )
}

function TextZoomControls({
  fontScale,
  minFontScale,
  maxFontScale,
  isMagnifierEnabled,
  isHighContrastEnabled,
  onDecrease,
  onReset,
  onIncrease,
  onToggleMagnifier,
  onToggleHighContrast,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }, [])

  const toggleMenu = useCallback(() => {
    setIsOpen((currentValue) => !currentValue)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const firstEnabledButton = menuRef.current?.querySelector('button:not([disabled])')
    firstEnabledButton?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
      }
    }

    const handlePointerDown = (event) => {
      if (containerRef.current?.contains(event.target)) {
        return
      }

      setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen, closeMenu])

  const zoomPercent = Math.round(fontScale * 100)

  return (
    <div ref={containerRef} className="text-zoom-controls" aria-label="Controles de tamanho do texto">
      <div
        ref={menuRef}
        id={menuId}
        className={`text-zoom-menu ${isOpen ? 'is-open' : ''}`}
        role="group"
        aria-label="Opções de acessibilidade"
      >
        <div className="zoom-section-label">Texto</div>

        <div className="zoom-scale-display">
          <button
            type="button"
            className="zoom-scale-btn"
            onClick={onDecrease}
            disabled={fontScale <= minFontScale}
            title="Diminuir fonte"
          >
            <span aria-hidden="true">−</span>
          </button>

          <span className="zoom-scale-value">
            <span>{zoomPercent}</span>
            <span className="zoom-scale-pct">%</span>
          </span>

          <button
            type="button"
            className="zoom-scale-btn"
            onClick={onIncrease}
            disabled={fontScale >= maxFontScale}
            title="Aumentar fonte"
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>

        <div className="zoom-divider" />
        <div className="zoom-section-label">Recursos</div>

        <button
          type="button"
          className={isMagnifierEnabled ? 'is-active' : ''}
          onClick={onToggleMagnifier}
          aria-pressed={isMagnifierEnabled}
        >
          <span className="zoom-btn-icon">
            <SearchIcon />
          </span>
          Lupa de texto
          <span className="zoom-toggle-pill" aria-hidden="true" />
        </button>

        <button
          type="button"
          className={isHighContrastEnabled ? 'is-active' : ''}
          onClick={onToggleHighContrast}
          aria-pressed={isHighContrastEnabled}
        >
          <span className="zoom-btn-icon">
            <ContrastIcon />
          </span>
          Alto contraste
          <span className="zoom-toggle-pill" aria-hidden="true" />
        </button>

        <button type="button" className="zoom-reset-row" onClick={onReset} disabled={fontScale === 1}>
          <ResetIcon />
          Restaurar padrão
        </button>
      </div>

      <button
        ref={triggerRef}
        type="button"
        className="text-zoom-trigger"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-label={isOpen ? 'Fechar controles de acessibilidade' : 'Abrir controles de acessibilidade'}
        title="Controles de acessibilidade"
      >
        <GlobeIcon />
      </button>
    </div>
  )
}

export default TextZoomControls
