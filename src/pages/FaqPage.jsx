import { LuChevronDown } from 'react-icons/lu'
import ContentPage from '../components/ContentPage.jsx'
import InternalLink from '../components/InternalLink.jsx'
import { FAQ } from '../content/health.js'

function FaqPage() {
  const sources = FAQ.map((item) => item.source).filter(
    (source, index, list) => source && list.findIndex((other) => other?.url === source.url) === index,
  )

  return (
    <ContentPage
      title="Perguntas frequentes"
      lead="Respostas curtas para as dúvidas mais comuns sobre o câncer de mama e sobre a avaliação do RiskCare."
      sources={sources}
    >
      <div className="content-faq">
        {FAQ.map((item) => (
          <details className="content-faq__item" key={item.question}>
            <summary>
              {item.question}
              <LuChevronDown className="content-faq__chevron" aria-hidden="true" />
            </summary>
            <p>
              {item.answer}{' '}
              {item.link ? <InternalLink href={item.link.href}>{item.link.label}</InternalLink> : null}
            </p>
          </details>
        ))}
      </div>
    </ContentPage>
  )
}

export default FaqPage
