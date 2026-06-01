function ToastContainer({ toasts, onDismiss }) {
  return (
    <div id="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast${toast.isLeaving ? ' out' : ''}`}
          role="status"
          onClick={() => onDismiss(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export default ToastContainer
