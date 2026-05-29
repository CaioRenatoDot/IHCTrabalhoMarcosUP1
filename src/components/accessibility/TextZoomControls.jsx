import { useState } from 'react'
import { FaSearchPlus, FaUniversalAccess } from 'react-icons/fa'

function TextZoomControls({
  fontScale,
  minFontScale,
  maxFontScale,
  isMagnifierEnabled,
  onDecrease,
  onReset,
  onIncrease,
  onToggleMagnifier,
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="text-zoom-controls"
      aria-label="Controles de tamanho do texto"
    >
      {isOpen && (
        <div className="text-zoom-menu" role="menu">
          <button
            type="button"
            onClick={onIncrease}
            disabled={fontScale >= maxFontScale}
            role="menuitem"
          >
            <span aria-hidden="true">+</span>
            Aumentar fonte
          </button>

          <button
            type="button"
            onClick={onDecrease}
            disabled={fontScale <= minFontScale}
            role="menuitem"
          >
            <span aria-hidden="true">-</span>
            Diminuir fonte
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={fontScale === 1}
            role="menuitem"
          >
            <span aria-hidden="true">A</span>
            Restaurar fonte
          </button>

          <button
            type="button"
            className={isMagnifierEnabled ? 'is-active' : ''}
            onClick={onToggleMagnifier}
            role="menuitem"
            aria-pressed={isMagnifierEnabled}
          >
            <span aria-hidden="true">
              <FaSearchPlus />
            </span>
            {isMagnifierEnabled ? 'Desativar lupa' : 'Ativar lupa'}
          </button>
        </div>
      )}

      <button
        type="button"
        className="text-zoom-trigger"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        aria-expanded={isOpen}
        aria-label="Abrir controles de acessibilidade"
        title="Controles de acessibilidade"
      >
        <FaUniversalAccess aria-hidden="true" />
      </button>
    </div>
  )
}

export default TextZoomControls
