function WarningIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="observation-banner__icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 4 3.5 19h17L12 4Z" />
      <path d="M12 9v5" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function ObservationBanner() {
  return (
    <section className="observation-banner" aria-label="Aviso importante">
      <WarningIcon />
      <p className="observation-banner__text">
        {
          'Esta ferramenta n\u00E3o realiza diagn\u00F3stico m\u00E9dico. Consulte sempre um profissional de sa\u00FAde qualificado.'
        }
      </p>
    </section>
  )
}

export default ObservationBanner
