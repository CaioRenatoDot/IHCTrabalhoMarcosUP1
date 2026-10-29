import { LuExternalLink } from 'react-icons/lu'
import ContentPage from '../components/ContentPage.jsx'
import { NEWS, formatNewsDate } from '../content/news.js'

function NewsPage() {
  const news = [...NEWS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <ContentPage
      title="Notícias"
      lead="Notícias de fontes oficiais sobre prevenção, rastreamento e cuidado do câncer de mama. Cada item leva ao texto original."
    >
      <ul className="content-news">
        {news.map((item) => (
          <li className="content-news__item" key={item.id}>
            <p className="content-news__meta">
              <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{item.source}</span>
            </p>
            <h2 className="content-news__title">{item.title}</h2>
            <p>{item.summary}</p>
            <a className="content-news__link" href={item.url} target="_blank" rel="noopener noreferrer">
              Ler na fonte
              <LuExternalLink aria-hidden="true" />
              <span className="visually-hidden"> ({item.source}, abre em nova aba)</span>
            </a>
          </li>
        ))}
      </ul>
    </ContentPage>
  )
}

export default NewsPage
