function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 4 4-6" />
    </svg>
  )
}

function HealthIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9-6-18-3 9H2" />
    </svg>
  )
}

function HowItWorksSection() {
  return (
    <section className="how-section-content" aria-labelledby="how-section-title">
      <div className="how-header">
        <div className="section-tag">Passo a passo</div>
        <h2 id="how-section-title" className="section-title">
          Como funciona
        </h2>
        <p className="section-sub">
          Em poucos minutos você entende melhor seus fatores de risco e sabe como agir.
        </p>
      </div>

      <div className="how-grid">
        <article className="how-step">
          <div className="how-step-num">1</div>
          <div className="how-step-icon">
            <ProfileIcon />
          </div>
          <h3>Crie seu perfil</h3>
          <p>Cadastre-se com nome, e-mail e senha para salvar seu histórico e acompanhar sua evolução.</p>
          <div className="how-step-arrow" aria-hidden="true">
            <ArrowIcon />
          </div>
        </article>

        <article className="how-step">
          <div className="how-step-num">2</div>
          <div className="how-step-icon">
            <ClipboardIcon />
          </div>
          <h3>Responda o questionário</h3>
          <p>Perguntas simples sobre idade, histórico familiar, hábitos e sintomas. Leva cerca de 5 minutos.</p>
          <div className="how-step-arrow" aria-hidden="true">
            <ArrowIcon />
          </div>
        </article>

        <article className="how-step">
          <div className="how-step-num">3</div>
          <div className="how-step-icon">
            <ChartIcon />
          </div>
          <h3>Veja sua estimativa</h3>
          <p>Gráficos e indicadores claros mostram seu nível de risco com orientações personalizadas.</p>
          <div className="how-step-arrow" aria-hidden="true">
            <ArrowIcon />
          </div>
        </article>

        <article className="how-step">
          <div className="how-step-num">4</div>
          <div className="how-step-icon">
            <HealthIcon />
          </div>
          <h3>Orientação médica</h3>
          <p>Compartilhe seus resultados com um profissional e tome decisões informadas sobre sua saúde.</p>
        </article>
      </div>
    </section>
  )
}

export default HowItWorksSection
