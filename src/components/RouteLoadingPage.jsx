import RiskCareLogo from './RiskCareLogo.jsx'

const BRAND_NAME = 'RiskCare'

// Tela de espera do site: a logo é desenhada em loop enquanto a página carrega.
// Com `revealed`, o texto "Carregando…" dá lugar ao nome RiskCare, que surge letra por letra.
function RouteLoadingPage({ label = 'Carregando', revealed = false }) {
  return (
    <main className={`route-loading${revealed ? ' is-revealed' : ''}`} role="status" aria-live="polite">
      <RiskCareLogo animated className="route-loading__logo rc-logo--loop" />
      {revealed ? (
        <p className="route-loading__name" aria-label={BRAND_NAME}>
          {BRAND_NAME.split('').map((letter, index) => (
            <span key={`${letter}-${index}`} aria-hidden="true" style={{ '--letter-index': index }}>
              {letter}
            </span>
          ))}
        </p>
      ) : (
        <p className="route-loading__label">{label}…</p>
      )}
    </main>
  )
}

export default RouteLoadingPage
