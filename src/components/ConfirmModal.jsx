import { createPortal } from 'react-dom'
import { useEffect, useId, useRef } from 'react'
import '../styles/modal.css'

function ConfirmModal({
  cancelLabel = 'Cancelar',
  children,
  confirmLabel = 'Confirmar',
  description,
  iconLabel = '?',
  confirmDisabled = false,
  cancelDisabled = false,
  open,
  title,
  tone = 'primary',
  onCancel,
  onConfirm,
}) {
  const titleId = useId()
  const descriptionId = useId()
  const cancelButtonRef = useRef(null)
  const previousActiveElementRef = useRef(null)

  useEffect(() => {
    if (!open || typeof document === 'undefined') {
      return undefined
    }

    previousActiveElementRef.current = document.activeElement

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCancel?.()
      }
    }

    const body = document.body
    const previousOverflow = body.style.overflow

    body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      cancelButtonRef.current?.focus({ preventScroll: true })
    }, 0)

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      body.style.overflow = previousOverflow

      const previousActiveElement = previousActiveElementRef.current
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus({ preventScroll: true })
      }
    }
  }, [open, onCancel])

  if (!open || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="confirm-modal" onClick={onCancel} role="presentation">
      <div className="confirm-modal__backdrop" aria-hidden="true" />

      <section
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        className={`confirm-modal__dialog confirm-modal__dialog--${tone}`}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="confirm-modal__header">
          <div className="confirm-modal__icon" aria-hidden="true">
            {iconLabel}
          </div>

          <div className="confirm-modal__titles">
            <h2 id={titleId}>{title}</h2>
            {description ? <p id={descriptionId}>{description}</p> : null}
          </div>
        </div>

        {children ? <div className="confirm-modal__body">{children}</div> : null}

        <div className="confirm-modal__actions">
          <button
            ref={cancelButtonRef}
            className="confirm-modal__button confirm-modal__button--secondary"
            type="button"
            disabled={cancelDisabled}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>

          <button
            className={`confirm-modal__button confirm-modal__button--primary confirm-modal__button--${tone}`}
            type="button"
            disabled={confirmDisabled}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>,
    document.body,
  )
}

export default ConfirmModal
