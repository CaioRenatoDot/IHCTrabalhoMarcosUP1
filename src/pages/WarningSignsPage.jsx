import { LuTriangleAlert } from 'react-icons/lu'
import ContentPage from '../components/ContentPage.jsx'
import InternalLink from '../components/InternalLink.jsx'
import { SOURCES, WARNING_SIGNS } from '../content/health.js'

function WarningSignsPage() {
  return (
    <ContentPage
      title="Sinais de alerta"
      lead="Conhecer o próprio corpo ajuda a perceber mudanças. Estas alterações nas mamas merecem avaliação de um profissional de saúde."
      sources={[SOURCES.incaBooklet]}
    >
      <section aria-labelledby="sinais-lista">
        <h2 id="sinais-lista">Fique atenta a estas alterações</h2>
        <ol className="content-numbered">
          {WARNING_SIGNS.map((sign) => (
            <li key={sign}>{sign}</li>
          ))}
        </ol>
      </section>

      <div className="content-callout content-callout--danger" role="note">
        <LuTriangleAlert aria-hidden="true" />
        <p>
          <strong>Notou alguma dessas alterações? Procure uma unidade de saúde para avaliação.</strong> Não espere o
          próximo exame de rotina. A maioria das alterações não é câncer, mas todas devem ser investigadas.
        </p>
      </div>

      <section aria-labelledby="sinais-depois">
        <h2 id="sinais-depois">E depois?</h2>
        <p>
          O profissional de saúde vai examinar as mamas e, se necessário, indicar exames de imagem. Se você ainda não
          sabe onde ser atendida, veja <InternalLink href="/onde-buscar-ajuda">onde buscar ajuda</InternalLink>.
        </p>
        <p>
          Os sinais de alerta são diferentes da mamografia de rastreamento, que é feita em mulheres <em>sem</em>{' '}
          sintomas. Veja <InternalLink href="/mamografia">quando fazer mamografia</InternalLink>.
        </p>
      </section>
    </ContentPage>
  )
}

export default WarningSignsPage
