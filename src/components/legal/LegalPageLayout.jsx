function BrandIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="legal-header-brand__icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="legal-callout-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="legal-contact-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function LegalPageLayout({
  title,
  subtitle,
  chips,
  updatedLabel,
  summaryText,
  calloutTitle,
  calloutText,
  children,
}) {
  return (
    <div className="legal-page" aria-label={title}>
      <header className="legal-header">
        <div className="legal-header-top">
          <span className="legal-header-brand">
            <BrandIcon />
            RiskCare
          </span>
        </div>

        <h1>{title}</h1>
        <p className="legal-header-desc">{subtitle}</p>

        <div className="legal-header-meta">
          {chips.map((chip) => (
            <span key={chip} className="legal-chip">
              {chip}
            </span>
          ))}
          <span className="legal-header-meta-date">{updatedLabel}</span>
        </div>
      </header>

      <div className="legal-content">
        <section className="legal-card legal-summary">
          <div className="legal-summary__label">Resumo</div>
          <p>{summaryText}</p>
        </section>

        <section className="legal-card legal-callout" aria-label="Aviso importante">
          <WarningIcon />
          <div>
            <h2>{calloutTitle}</h2>
            <p>{calloutText}</p>
          </div>
        </section>

        {children}

        <div className="legal-contact" aria-label="Contato">
          <ContactIcon />
          <div>
            <h3>Dúvidas ou solicitações</h3>
            <p>
              Em caso de dúvidas sobre este documento ou sobre o funcionamento do RiskCare,
              entre em contato pelos canais oficiais disponibilizados pela equipe responsável
              pelo projeto.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalPageLayout
