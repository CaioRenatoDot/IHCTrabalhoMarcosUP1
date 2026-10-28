import RiskCareLogo from './RiskCareLogo.jsx'

// Tela de espera do site: a logo é desenhada em loop enquanto a página carrega.
function RouteLoadingPage({ label = 'Carregando' }) {
  return (
    <main className="route-loading" role="status" aria-live="polite">
      <RiskCareLogo animated className="route-loading__logo rc-logo--loop" />
      <p className="route-loading__label">{label}…</p>
    </main>
  )
}

export default RouteLoadingPage
