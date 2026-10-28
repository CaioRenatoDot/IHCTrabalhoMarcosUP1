const publicoAlvo = [
  'Mulheres acima de 18 anos',
  'Homens interessados em prevenção',
  'Pessoas com ou sem histórico familiar',
  'Quem busca informação inicial antes da consulta',
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
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function Cover() {
  return (
    <section className="cover stagger-fade" aria-label="Sobre o RiskCare">
      <aside className="cover__left">
        <div className="cover-brand">
          <span className="cover-brand__icon">
            <BrandIcon />
          </span>
          <span className="cover-brand__text">RiskCare</span>
        </div>

        <span className="cover-chip">Sobre o projeto</span>

        <h1 className="cover-title">
          {'Informação que protege, conhecimento que acolhe'}
        </h1>

        <p className="cover-subtitle">
          {
            'Uma plataforma educativa criada para conscientizar e informar sobre fatores de risco do câncer de mama, promovendo prevenção através da informação acessível.'
          }
        </p>

        <ul className="cover-tag-list" aria-label="Temas do projeto">
          <li>Educativo</li>
          <li>{'Prevenção'}</li>
          <li>{'Saúde da mulher'}</li>
          <li>Acessibilidade</li>
        </ul>
      </aside>

      <div className="cover__right">
        <section className="cover-block" style={{ '--stagger-index': 1 }}>
          <div className="cover-block__head">
            <h2>CONCEITO</h2>
            <span />
          </div>
          <p>
            {
              'O RiskCare nasce da necessidade de tornar a informação sobre prevenção do câncer de mama mais acessível, clara e acolhedora. Através de questionários intuitivos e feedback visual, ajudamos usuários a entenderem melhor seus fatores de risco e a tomarem decisões informadas sobre sua saúde.'
            }
          </p>

          <section className="cover-alert" aria-label="Aviso">
            <WarningIcon />
            <p>
              {'Esta ferramenta '}
              <strong>{'não realiza diagnóstico médico'}</strong>
              {
                '. Os resultados são estimativas baseadas em fatores de risco gerais e não substituem consulta com profissional de saúde.'
              }
            </p>
          </section>
        </section>

        <section className="cover-block" style={{ '--stagger-index': 2 }}>
          <div className="cover-block__head">
            <h2>{'PÚBLICO-ALVO'}</h2>
            <span />
          </div>
          <ul className="cover-audience">
            {publicoAlvo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="cover-block" style={{ '--stagger-index': 3 }}>
          <div className="cover-block__head">
            <h2>PROBLEMA</h2>
            <span />
          </div>
          <p>
            {
              'O acesso à informação clara sobre prevenção do câncer de mama ainda é um desafio. Muitas pessoas desconhecem fatores de risco básicos ou adiam a busca por orientação médica por falta de informação acessível. O RiskCare preenche essa lacuna com uma ferramenta educativa gratuita, empática e respaldada por dados.'
            }
          </p>
        </section>

        <section className="cover-block cover-team" style={{ '--stagger-index': 4 }}>
          <div className="cover-block__head">
            <h2>EQUIPE</h2>
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
