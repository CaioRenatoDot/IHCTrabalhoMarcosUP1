const publicoAlvo = [
  'Mulheres acima de 18 anos',
  'Homens interessados em preven\u00e7\u00e3o',
  'Pessoas com ou sem hist\u00f3rico familiar',
  'Quem busca informa\u00e7\u00e3o inicial antes da consulta',
]

const integrantes = [
  { initials: 'CG', name: 'Caio Gabriel Pereira de Menezes Correia' },
  { initials: 'CR', name: 'Caio Renato dos Santos Claudino' },
  { initials: 'JF', name: 'Jos\u00e9 Francisco de Araujo Neto' },
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
    <section className="cover stagger-fade" aria-label="Capa do projeto RiskCare">
      <aside className="cover__left">
        <div className="cover-brand">
          <span className="cover-brand__icon">
            <BrandIcon />
          </span>
          <span className="cover-brand__text">RiskCare</span>
        </div>

        <span className="cover-chip">Sobre o projeto</span>

        <h1 className="cover-title">
          {'Informa\u00e7\u00e3o que protege, conhecimento que acolhe'}
        </h1>

        <p className="cover-subtitle">
          {
            'Uma plataforma educativa criada para conscientizar e informar sobre fatores de risco do c\u00e2ncer de mama, promovendo preven\u00e7\u00e3o atrav\u00e9s da informa\u00e7\u00e3o acess\u00edvel.'
          }
        </p>

        <ul className="cover-tag-list" aria-label="Temas do projeto">
          <li>Educativo</li>
          <li>{'Preven\u00e7\u00e3o'}</li>
          <li>{'Sa\u00fade da mulher'}</li>
          <li>IHC</li>
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
              'O RiskCare nasce da necessidade de tornar a informa\u00e7\u00e3o sobre preven\u00e7\u00e3o do c\u00e2ncer de mama mais acess\u00edvel, clara e acolhedora. Atrav\u00e9s de question\u00e1rios intuitivos e feedback visual, ajudamos usu\u00e1rios a entenderem melhor seus fatores de risco e a tomarem decis\u00f5es informadas sobre sua sa\u00fade.'
            }
          </p>

          <section className="cover-alert" aria-label="Aviso">
            <WarningIcon />
            <p>
              {'Esta ferramenta '}
              <strong>{'n\u00e3o realiza diagn\u00f3stico m\u00e9dico'}</strong>
              {
                '. Os resultados s\u00e3o estimativas baseadas em fatores de risco gerais e n\u00e3o substituem consulta com profissional de sa\u00fade.'
              }
            </p>
          </section>
        </section>

        <section className="cover-block" style={{ '--stagger-index': 2 }}>
          <div className="cover-block__head">
            <h2>{'P\u00daBLICO-ALVO'}</h2>
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
              'O acesso \u00e0 informa\u00e7\u00e3o clara sobre preven\u00e7\u00e3o do c\u00e2ncer de mama ainda \u00e9 um desafio. Muitas pessoas desconhecem fatores de risco b\u00e1sicos ou adiam a busca por orienta\u00e7\u00e3o m\u00e9dica por falta de informa\u00e7\u00e3o acess\u00edvel. O RiskCare preenche essa lacuna com uma ferramenta educativa gratuita, emp\u00e1tica e respaldada por dados.'
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
