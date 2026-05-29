import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { FaAdjust, FaSearchPlus, FaUniversalAccess } from 'react-icons/fa'

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

    const handleFocusOut = (event) => {
      const nextTarget = event.relatedTarget

      if (!nextTarget || !containerRef.current?.contains(nextTarget)) {
        setIsOpen(false)
      }
    }

    const container = containerRef.current

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    container?.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
      container?.removeEventListener('focusout', handleFocusOut)
    }
  }, [isOpen, closeMenu])

  return (
    <div
      ref={containerRef}
      className="text-zoom-controls"
      aria-label="Controles de tamanho do texto"
    >
      {isOpen && (
        <div
          ref={menuRef}
          id={menuId}
          className="text-zoom-menu"
          role="group"
          aria-label="Opções de acessibilidade"
        >
          <button
            type="button"
            onClick={onIncrease}
            disabled={fontScale >= maxFontScale}
          >
            <span aria-hidden="true">+</span>
            Aumentar fonte
          </button>

          <button
            type="button"
            onClick={onDecrease}
            disabled={fontScale <= minFontScale}
          >
            <span aria-hidden="true">-</span>
            Diminuir fonte
          </button>

          <button type="button" onClick={onReset} disabled={fontScale === 1}>
            <span aria-hidden="true">A</span>
            Restaurar fonte
          </button>

          <button
            type="button"
            className={isMagnifierEnabled ? 'is-active' : ''}
            onClick={onToggleMagnifier}
            aria-pressed={isMagnifierEnabled}
          >
            <span aria-hidden="true">
              <FaSearchPlus />
            </span>
            {isMagnifierEnabled ? 'Desativar lupa' : 'Ativar lupa'}
          </button>

          <button
            type="button"
            className={isHighContrastEnabled ? 'is-active' : ''}
            onClick={onToggleHighContrast}
            role="menuitem"
            aria-pressed={isHighContrastEnabled}
          >
            <span aria-hidden="true">
              <FaAdjust />
            </span>
            {isHighContrastEnabled ? 'Desativar contraste' : 'Ativar contraste'}
          </button>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        className="text-zoom-trigger"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-label={
          isOpen
            ? 'Fechar controles de acessibilidade'
            : 'Abrir controles de acessibilidade'
        }
        title="Controles de acessibilidade"
      >
        <FaUniversalAccess aria-hidden="true" />
      </button>
    </div>
  )
}

export default TextZoomControls
