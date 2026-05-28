const publicoAlvo = [
  'Mulheres adultas',
  'Pessoas com histórico familiar',
  'Estudantes de saúde',
  'Usuários interessados em prevenção',
]

const integrantes = [
  { initials: 'CG', name: 'Caio Gabriel Pereira de Menezes Correia' },
  { initials: 'CR', name: 'Caio Renato dos Santos Claudino' },
  { initials: 'JF', name: 'José Francisco de Araujo Neto' },
  { initials: 'TP', name: 'Thalita Pereira de Andrade' },
]

function WarningIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="cover-alert__icon"
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

function BrandIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="cover-brand__icon-svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />
    </svg>
  )
}

function Cover() {
  return (
    <section className="cover" aria-label="Capa do projeto RiskCare">
      <aside className="cover__left">
        <div className="cover-brand">
          <span className="cover-brand__icon">
            <BrandIcon />
          </span>
          <span className="cover-brand__text">RiskCare</span>
        </div>

        <span className="cover-chip">PROJETO ACADÊMICO - 2026</span>

        <h1 className="cover-title">
          Plataforma de análise
          <br />
          de risco de câncer de mama
        </h1>

        <p className="cover-subtitle">
          Uma ferramenta educativa e acessível para apoio à conscientização e
          prevenção do câncer de mama.
        </p>

        <ul className="cover-tag-list" aria-label="Temas do projeto">
          <li>Saúde</li>
          <li>Prevenção</li>
          <li>UI Design</li>
          <li>Figma</li>
        </ul>
      </aside>

      <div className="cover__right">
        <section className="cover-block">
          <div className="cover-block__head">
            <h2>CONCEITO DO PRODUTO</h2>
            <span />
          </div>
          <p>
            Desenvolver uma plataforma web de análise de risco do câncer de
            mama, utilizando dados reais como referência para promover
            conscientização e incentivar a busca por acompanhamento médico.
          </p>
        </section>

        <section className="cover-alert" aria-label="Aviso">
          <WarningIcon />
          <p>
            O sistema não realiza diagnóstico médico, apenas apresenta
            estimativas baseadas em dados para fins educativos.
          </p>
        </section>

        <section className="cover-block">
          <div className="cover-block__head">
            <h2>PÚBLICO-ALVO</h2>
            <span />
          </div>
          <ul className="cover-audience">
            {publicoAlvo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="cover-block">
          <div className="cover-block__head">
            <h2>PROBLEMA QUE RESOLVE</h2>
            <span />
          </div>
          <p>
            Muitas pessoas não conhecem os fatores de risco do câncer de mama,
            o que atrasa a busca por avaliação médica. A proposta oferece uma
            ferramenta acessível e informativa para conscientização.
          </p>
        </section>

        <section className="cover-block cover-team">
          <div className="cover-block__head">
            <h2>INTEGRANTES</h2>
            <span />
          </div>
          <ul className="cover-team__list">
            {integrantes.map((pessoa) => (
              <li key={pessoa.name}>
                <span className="cover-team__avatar">{pessoa.initials}</span>
                <span>{pessoa.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}

export default Cover
