import { LuBuilding2, LuPhone } from 'react-icons/lu'
import ContentPage from '../components/ContentPage.jsx'
import InternalLink from '../components/InternalLink.jsx'
import { SUPPORT_CONTACTS } from '../content/health.js'

function HelpPage() {
  return (
    <ContentPage
      title="Onde buscar ajuda"
      lead="Para dúvidas sobre exames, consultas ou alterações nas mamas, o primeiro passo é a unidade básica de saúde mais próxima."
    >
      <section aria-labelledby="ajuda-ubs">
        <h2 id="ajuda-ubs">Unidade básica de saúde (UBS)</h2>
        <div className="content-card">
          <LuBuilding2 className="content-card__icon" aria-hidden="true" />
          <p>
            É a porta de entrada do SUS. Lá você pode passar por consulta, pedir orientação sobre a mamografia e ser
            encaminhada para exames ou especialistas quando necessário. Se notar algum{' '}
            <InternalLink href="/sinais-de-alerta">sinal de alerta</InternalLink>, procure a UBS sem esperar o próximo
            exame de rotina.
          </p>
        </div>
      </section>

      <section aria-labelledby="ajuda-telefones">
        <h2 id="ajuda-telefones">Telefones gratuitos</h2>
        <ul className="content-contacts">
          {SUPPORT_CONTACTS.map((contact) => (
            <li className="content-card" key={contact.number}>
              <LuPhone className="content-card__icon" aria-hidden="true" />
              <div>
                <p className="content-contacts__name">
                  {contact.name}{' '}
                  <a href={`tel:${contact.number}`} aria-label={`Ligar para ${contact.name}, ${contact.number}`}>
                    {contact.number}
                  </a>
                </p>
                <p>{contact.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ajuda-emocional">
        <h2 id="ajuda-emocional">Apoio emocional</h2>
        <p>
          Dúvidas, exames e esperas por resultado podem gerar ansiedade. Conversar ajuda: o CVV atende de forma gratuita
          e sigilosa, 24 horas, pelo telefone 188.
        </p>
      </section>
    </ContentPage>
  )
}

export default HelpPage
