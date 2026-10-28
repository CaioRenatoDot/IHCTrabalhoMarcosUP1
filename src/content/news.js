// Notícias com curadoria manual: apenas fontes oficiais, conferidas antes de entrar.
// Para atualizar: acrescente o item no topo (mais recente primeiro) e confira data e link na fonte.
// A busca automática no back está planejada em PLANEJAMENTO.md (seção 3.6) e CHECKLIST.md (BK-13).

export const NEWS_REVIEWED_AT = '2026-10-28'

// A seção deixa de aparecer se a notícia mais recente tiver mais que este número de meses.
export const NEWS_MAX_AGE_MONTHS = 12

export const NEWS = [
  {
    id: 'inca-outubro-rosa-2026',
    date: '2026-10-21',
    source: 'INCA',
    title: 'Disparidades raciais no câncer de mama é tema do Outubro Rosa 2026 no INCA',
    summary:
      'O INCA lança um livro com evidências sobre as diferenças na incidência do câncer de mama entre mulheres negras, no Brasil e no mundo.',
    url: 'https://www.gov.br/inca/pt-br/assuntos/noticias/2026/disparidades-raciais-no-cancer-de-mama-e-tema-do-outubro-rosa-2026-no-inca',
  },
  {
    id: 'mulheres-desinformacao-2026',
    date: '2026-10-19',
    source: 'Ministério das Mulheres',
    title: 'Outubro Rosa: desinformação ainda dificulta a prevenção e o diagnóstico precoce do câncer de mama',
    summary:
      'Informações incorretas podem atrasar a busca por atendimento. Segundo o INCA, entre 90% e 95% dos casos não têm relação com mutações hereditárias.',
    url: 'https://www.gov.br/mulheres/pt-br/central-de-conteudos/noticias/2026/outubro-defeso-eleitoral/outubro-rosa-desinformacao-ainda-dificulta-a-prevencao-e-o-diagnostico-precoce-do-cancer-de-mama',
  },
  {
    id: 'inca-estimativa-2026-2028',
    date: '2026-02-04',
    source: 'INCA',
    title: 'INCA estima 781 mil novos casos de câncer por ano no Brasil entre 2026 e 2028',
    summary:
      'O câncer de mama segue como o mais frequente entre as mulheres, com 78.610 casos novos estimados por ano no triênio.',
    url: 'https://www.gov.br/inca/pt-br/assuntos/noticias/2026/inca-estima-781-mil-novos-casos-de-cancer-por-ano-no-brasil-entre-2026-e-2028',
  },
  {
    id: 'lei-15284-mamografia',
    date: '2025-12-19',
    source: 'Ministério das Mulheres',
    title: 'Sancionada lei que amplia acesso das mulheres ao exame de mamografia fornecido pelo SUS',
    summary:
      'A Lei nº 15.284 assegura a mamografia pelo SUS a mulheres a partir dos 40 anos, mesmo sem sinais ou sintomas.',
    url: 'https://www.gov.br/mulheres/pt-br/central-de-conteudos/noticias/2025/dezembro/sancionada-lei-que-amplia-acesso-das-mulheres-ao-exame-de-mamografia-fornecido-pelo-sus',
  },
  {
    id: 'ms-nota-tecnica-mamografia',
    date: '2025-09-29',
    source: 'INCA',
    title: 'Ministério da Saúde padroniza informações para acesso ao exame de mamografia no SUS',
    summary:
      'Rastreamento a cada dois anos para mulheres de 50 a 74 anos; de 40 a 49 e acima de 74, o exame pode ser feito por demanda, após orientação.',
    url: 'https://www.gov.br/inca/pt-br/assuntos/noticias/2025/ministerio-da-saude-padroniza-informacoes-para-acesso-ao-exame-de-mamografia-no-sus',
  },
]

export function getRecentNews(limit, today = new Date()) {
  const sorted = [...NEWS].sort((a, b) => b.date.localeCompare(a.date))
  const newest = sorted[0]

  if (!newest) {
    return []
  }

  const cutoff = new Date(today)
  cutoff.setMonth(cutoff.getMonth() - NEWS_MAX_AGE_MONTHS)

  if (new Date(`${newest.date}T12:00:00`) < cutoff) {
    return []
  }

  return sorted.slice(0, limit)
}

export function formatNewsDate(isoDate) {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${isoDate}T12:00:00`),
  )
}
