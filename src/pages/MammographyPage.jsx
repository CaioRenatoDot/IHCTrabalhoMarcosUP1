import { LuInfo } from 'react-icons/lu'
import ContentPage from '../components/ContentPage.jsx'
import InternalLink from '../components/InternalLink.jsx'
import { SCREENING_RULES, SOURCES } from '../content/health.js'

function MammographyPage() {
  return (
    <ContentPage
      title="Quando fazer mamografia"
      lead="A mamografia de rastreamento é feita em mulheres sem sinais ou sintomas, para encontrar alterações antes que elas sejam percebidas."
      sources={[SOURCES.screeningNote, SOURCES.law15284]}
    >
      <section aria-labelledby="mamografia-faixas">
        <h2 id="mamografia-faixas">Recomendação do Ministério da Saúde</h2>
        <dl className="content-rules">
          {SCREENING_RULES.map((rule) => (
            <div className="content-rules__row" key={rule.ages}>
              <dt>{rule.ages}</dt>
              <dd>{rule.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="mamografia-lei">
        <h2 id="mamografia-lei">O que diz a lei</h2>
        <p>
          A <strong>Lei nº 15.284, de dezembro de 2025</strong>, garante a mamografia pelo SUS a mulheres a partir dos
          40 anos, mesmo sem sinais ou sintomas de câncer. O Ministério da Saúde pode ampliar o exame para outras faixas
          etárias.
        </p>
      </section>

      <div className="content-callout" role="note">
        <LuInfo aria-hidden="true" />
        <p>
          <strong>Tem sinais de alerta?</strong> Nesse caso não se trata de rastreamento: procure uma unidade de saúde
          para avaliação, em qualquer idade. Veja os <InternalLink href="/sinais-de-alerta">sinais de alerta</InternalLink>.
        </p>
      </div>

      <section aria-labelledby="mamografia-historico">
        <h2 id="mamografia-historico">Histórico familiar ou outros fatores de risco</h2>
        <p>
          Mulheres com histórico familiar importante ou outros fatores de risco podem precisar de um acompanhamento
          diferente. Converse com o profissional que acompanha a sua saúde sobre o que é indicado no seu caso.
        </p>
      </section>
    </ContentPage>
  )
}

export default MammographyPage
