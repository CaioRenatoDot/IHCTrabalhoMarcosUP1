function RouteLoadingPage({ label = 'Carregando' }) {
  return (
    <main className="login-loading-page" aria-live="polite">
      <div className="login-loading-dots" aria-label={label}>
        <span />
        <span />
        <span />
      </div>
    </main>
  )
}

export default RouteLoadingPage
