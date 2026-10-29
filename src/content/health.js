// Conteúdo de saúde verificado, compartilhado pela home e pelas páginas informativas.
// Regra do projeto: todo dado exibido tem fonte oficial registrada aqui (ver CLAUDE.md).
// Ao incluir ou alterar um texto, confira a fonte e atualize CONTENT_REVIEWED_AT.

export const CONTENT_REVIEWED_AT = '2026-10-28'

// label: nome completo (páginas internas e lista de fontes); short: versão curta usada na home.
export const SOURCES = {
  incaBooklet: {
    short: 'INCA, 2026',
    label: 'INCA — Câncer de mama: vamos falar sobre isso? (2026)',
    url: 'https://ninho.inca.gov.br/jspui/bitstream/123456789/18158/1/cartilha-mama-2026%20-%20DefesoEleitoral.pdf',
  },
  incaEstimate: {
    short: 'INCA, Estimativa 2026–2028',
    label: 'INCA — Estimativa 2026–2028: síntese de resultados',
    url: 'https://www.gov.br/inca/pt-br/assuntos/cancer/numeros/estimativa/sintese-de-resultados-e-comentarios',
  },
  incaEstimateNews: {
    short: 'INCA, 2026',
    label: 'INCA — Estimativa de casos novos de câncer 2026–2028 (04/02/2026)',
    url: 'https://www.gov.br/inca/pt-br/assuntos/noticias/2026/inca-estima-781-mil-novos-casos-de-cancer-por-ano-no-brasil-entre-2026-e-2028',
  },
  screeningNote: {
    short: 'INCA / Ministério da Saúde, 2025',
    label: 'INCA — Ministério da Saúde padroniza informações para acesso à mamografia no SUS (29/09/2025)',
    url: 'https://www.gov.br/inca/pt-br/assuntos/noticias/2025/ministerio-da-saude-padroniza-informacoes-para-acesso-ao-exame-de-mamografia-no-sus',
  },
  law15284: {
    short: 'Lei nº 15.284/2025',
    label: 'Ministério das Mulheres — Lei nº 15.284/2025 amplia o acesso à mamografia no SUS (19/12/2025)',
    url: 'https://www.gov.br/mulheres/pt-br/central-de-conteudos/noticias/2025/dezembro/sancionada-lei-que-amplia-acesso-das-mulheres-ao-exame-de-mamografia-fornecido-pelo-sus',
  },
  misinformation: {
    short: 'Ministério das Mulheres, 2026',
    label: 'Ministério das Mulheres — Outubro Rosa: desinformação ainda dificulta a prevenção (19/10/2026)',
    url: 'https://www.gov.br/mulheres/pt-br/central-de-conteudos/noticias/2026/outubro-defeso-eleitoral/outubro-rosa-desinformacao-ainda-dificulta-a-prevencao-e-o-diagnostico-precoce-do-cancer-de-mama',
  },
}

export const FACTS = [
  {
    value: '78.610',
    text: 'casos novos de câncer de mama estimados por ano no Brasil (2026–2028)',
    source: SOURCES.incaEstimate,
  },
  {
    value: '1º',
    text: 'tipo de câncer mais frequente entre as mulheres, sem contar o de pele não melanoma',
    source: SOURCES.incaEstimateNews,
  },
]

export const WARNING_SIGNS = [
  'Nódulo (caroço), geralmente endurecido e indolor',
  'Pele da mama avermelhada, retraída ou parecida com casca de laranja',
  'Alterações no bico do peito (mamilo)',
  'Saída espontânea de líquido anormal pelos mamilos',
  'Pequenos nódulos nas axilas ou no pescoço',
]

export const SCREENING_RULES = [
  {
    ages: '50 a 74 anos',
    text: 'Mamografia de rastreamento a cada dois anos, mesmo sem sinais ou sintomas.',
  },
  {
    ages: '40 a 49 anos',
    text: 'O exame pode ser feito pelo SUS por demanda, depois de conversar com um profissional sobre riscos e benefícios.',
  },
  {
    ages: 'Acima de 74 anos',
    text: 'O exame também pode ser feito por demanda, após orientação do profissional de saúde.',
  },
]

// Orientação de rastreamento para uma idade informada (painel de quem está logada).
export function getScreeningGuidance(age) {
  if (!Number.isFinite(age)) {
    return null
  }

  if (age >= 50 && age <= 74) {
    return {
      title: 'Mamografia a cada dois anos',
      text: `Pela sua idade (${age} anos), a recomendação é fazer a mamografia de rastreamento a cada dois anos, mesmo sem sinais ou sintomas.`,
    }
  }

  if (age >= 40 && age < 50) {
    return {
      title: 'Decida junto com um profissional',
      text: `Pela sua idade (${age} anos), você pode fazer a mamografia pelo SUS por demanda, depois de conversar com um profissional sobre riscos e benefícios.`,
    }
  }

  if (age > 74) {
    return {
      title: 'Avalie com um profissional',
      text: `Pela sua idade (${age} anos), o exame pode ser feito por demanda, após orientação do profissional que acompanha a sua saúde.`,
    }
  }

  return {
    title: 'Fique atenta aos sinais',
    text: `Pela sua idade (${age} anos), a mamografia de rastreamento ainda não está na faixa recomendada. Se notar alguma alteração nas mamas, procure uma unidade de saúde.`,
  }
}

export const SUPPORT_CONTACTS = [
  {
    name: 'Disque Saúde',
    number: '136',
    description: 'Ministério da Saúde: informações sobre saúde e serviços do SUS. Ligação gratuita.',
  },
  {
    name: 'CVV',
    number: '188',
    description: 'Centro de Valorização da Vida: apoio emocional, 24 horas. Ligação gratuita.',
  },
  {
    name: 'SAMU',
    number: '192',
    description: 'Atendimento de urgência e emergência. Ligação gratuita.',
  },
]

export const TIPS = [
  {
    text: 'Entre 90% e 95% dos casos de câncer de mama não têm relação com mutações genéticas hereditárias.',
    source: SOURCES.misinformation,
    link: { href: '/perguntas-frequentes', label: 'Ver perguntas frequentes' },
  },
  {
    text: 'Pelo SUS, mulheres de 50 a 74 anos devem fazer a mamografia de rastreamento a cada dois anos.',
    source: SOURCES.screeningNote,
    link: { href: '/mamografia', label: 'Saiba quando fazer mamografia' },
  },
  {
    text: 'A Lei nº 15.284/2025 garante a mamografia pelo SUS a mulheres a partir dos 40 anos, mesmo sem sintomas.',
    source: SOURCES.law15284,
    link: { href: '/mamografia', label: 'Saiba quando fazer mamografia' },
  },
  {
    text: 'Ter um fator de risco não significa que a pessoa terá câncer de mama.',
    source: SOURCES.incaBooklet,
    link: { href: '/perguntas-frequentes', label: 'Ver perguntas frequentes' },
  },
  {
    text: 'O câncer de mama é o tipo mais frequente entre as mulheres no Brasil, sem contar o de pele não melanoma.',
    source: SOURCES.incaEstimateNews,
    link: { href: '/sinais-de-alerta', label: 'Conheça os sinais de alerta' },
  },
]

// Índice da dica do dia, estável durante o dia todo (ponto de partida do carrossel da home).
export function getTipOfTheDayIndex(today = new Date()) {
  const startOfYear = new Date(today.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((today - startOfYear) / 86400000)
  return dayOfYear % TIPS.length
}

export const FAQ = [
  {
    question: 'A avaliação faz diagnóstico?',
    answer:
      'Não. Ela é educativa: organiza suas respostas e mostra fatores associados ao risco. Somente um profissional de saúde pode avaliar se há alguma alteração e indicar exames.',
  },
  {
    question: 'Ter um fator de risco significa que vou ter câncer?',
    answer:
      'Não. Ter um ou mais fatores de risco não significa que a doença vai aparecer. Eles ajudam a entender quando vale conversar com um profissional sobre acompanhamento.',
    source: SOURCES.incaBooklet,
  },
  {
    question: 'O câncer de mama é sempre hereditário?',
    answer:
      'Não. Entre 90% e 95% dos casos não têm relação com mutações genéticas hereditárias. Mesmo assim, o histórico familiar é importante e vale ser conversado com um profissional.',
    source: SOURCES.misinformation,
  },
  {
    question: 'Quando devo fazer mamografia?',
    answer:
      'Pelo SUS, a mamografia de rastreamento é recomendada a cada dois anos para mulheres de 50 a 74 anos. Dos 40 aos 49, o exame pode ser feito por demanda, após conversar com um profissional.',
    source: SOURCES.screeningNote,
    link: { href: '/mamografia', label: 'Ver todas as orientações' },
  },
  {
    question: 'O que faço se notar alguma alteração na mama?',
    answer:
      'Procure uma unidade de saúde para avaliação, sem esperar o próximo exame de rotina. A maioria das alterações não é câncer, mas todas devem ser investigadas.',
    link: { href: '/sinais-de-alerta', label: 'Ver os sinais de alerta' },
  },
  {
    question: 'Quem pode fazer a avaliação do RiskCare?',
    answer:
      'Mulheres a partir de 18 anos. O câncer de mama também pode atingir homens, mas é raro; nesse caso, converse com um profissional sobre o seu histórico.',
  },
  {
    question: 'Preciso criar uma conta?',
    answer:
      'Por enquanto, sim: a conta permite salvar sua avaliação e consultar o resultado depois. Seus dados são tratados conforme a política de privacidade.',
    link: { href: '/politica-de-privacidade', label: 'Ler a política de privacidade' },
  },
]
