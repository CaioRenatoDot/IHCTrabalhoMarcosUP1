function ToastContainer({ toasts, onDismiss }) {
  return (
    <div id="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <button
          type="button"
          key={toast.id}
          className={`toast${toast.isLeaving ? ' out' : ''}`}
          aria-label="Fechar notificação"
          title="Fechar notificação"
          onClick={() => onDismiss(toast.id)}
        >
          {toast.message}
        </button>
      ))}
    </div>
  )
}

export default ToastContainer
