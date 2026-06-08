import { useEffect, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useAuth } from '../contexts/AuthContext.jsx'
import AccountShell from '../components/AccountShell.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import {
  getAssessmentStorageKey,
  readStoredAssessment,
  writeStoredAssessment,
} from '../lib/riskAssessmentStorage.js'
import { navigateWithoutReload } from '../utils/navigation.js'
import '../styles/account-shell.css'

const resultTabs = [
  { id: 'fatores-risco', label: 'Fatores de risco' },
  { id: 'comparativo-populacional', label: 'Comparativo populacional' },
  { id: 'detalhamento-fator', label: 'Detalhamento por fator' },
]

const legendItems = [
  { label: 'Você', className: 'is-user' },
  { label: 'Contexto populacional', className: 'is-average' },
  { label: 'Referência clínica', className: 'is-reference' },
]

const populationLegendBase = [
  { label: 'Baixo risco (0 - 20%)', className: 'is-low' },
  { label: 'Moderado (21 - 50%)', className: 'is-moderate' },
  { label: 'Alto (51 - 100%)', className: 'is-high' },
]

const fallbackComparisonData = [
  { factor: 'Histórico familiar', user: 72, average: 42, reference: 86 },
  { factor: 'Fator hormonal', user: 55, average: 38, reference: 78 },
  { factor: 'Última mamografia', user: 36, average: 46, reference: 74 },
  { factor: 'Estilo de vida', user: 40, average: 32, reference: 70 },
  { factor: 'IMC', user: 44, average: 36, reference: 76 },
  { factor: 'Idade (faixa)', user: 68, average: 34, reference: 82 },
]

const fallbackPopulationRiskData = [
  { range: '0-10', percent: 12, group: 'Baixo risco', color: 'var(--results-low)' },
  { range: '10-20', percent: 26, group: 'Baixo risco', color: 'var(--results-low)' },
  { range: '20-30', percent: 18, group: 'Moderado', color: 'var(--results-moderate)' },
  { range: '30-40', percent: 22, group: 'Você', color: 'var(--results-you)' },
  { range: '40-50', percent: 10, group: 'Moderado', color: 'var(--results-moderate)' },
  { range: '50-60', percent: 6, group: 'Alto', color: 'var(--results-high)' },
  { range: '60-70', percent: 4, group: 'Alto', color: 'var(--results-high)' },
  { range: '70-80', percent: 2, group: 'Alto', color: 'var(--results-high)' },
  { range: '80-90', percent: 1, group: 'Alto', color: 'var(--results-high)' },
  { range: '90-100', percent: 0.5, group: 'Alto', color: 'var(--results-high)' },
]

const fallbackFactorDetailData = [
  { factor: 'Histórico familiar', user: 78, average: 22 },
  { factor: 'Fator hormonal', user: 65, average: 38 },
  { factor: 'Estilo de vida', user: 58, average: 42 },
  { factor: 'Última mamografia', user: 45, average: 35 },
]

const fallbackProjectionData = [
  { age: 35, noIntervention: 25, prevention: 25, population: 22 },
  { age: 40, noIntervention: 32, prevention: 26, population: 24 },
  { age: 45, noIntervention: 42, prevention: 27, population: 26 },
  { age: 50, noIntervention: 52, prevention: 28, population: 29 },
  { age: 55, noIntervention: 61, prevention: 30, population: 32 },
  { age: 60, noIntervention: 68, prevention: 33, population: 35 },
  { age: 65, noIntervention: 72, prevention: 35, population: 38 },
]

const comparisonMatrixSections = [
  {
    field: 'Idade e faixa etária',
    base: 'INCA, SEER e OMS',
    type: 'Comparativo populacional',
    display: 'Card de faixa etária, barra comparativa e legenda contextual',
    note: 'É um dos comparativos mais fortes do MVP e ajuda a situar o usuário no panorama geral.',
  },
  {
    field: 'Estado/UF',
    base: 'INCA',
    type: 'Contexto regional',
    display: 'Card de contexto epidemiológico',
    note: 'Serve para contextualizar a carga regional sem inferência clínica direta.',
  },
  {
    field: 'IMC e marcadores metabólicos',
    base: 'Breast Cancer Coimbra',
    type: 'Comparativo metabólico',
    display: 'Card comparativo e barra de faixa',
    note: 'Sustenta o bloco de IMC e metabolismo com idade, glicose, insulina, HOMA e afins.',
  },
  {
    field: 'Mamografia, BI-RADS e severidade',
    base: 'Mammographic Mass e Wisconsin Diagnostic',
    type: 'Comparativo de exame',
    display: 'Card de rastreio e gráfico de referência',
    note: 'É o melhor apoio para sintomas, exame e contexto mamográfico.',
  },
  {
    field: 'Menopausa e recorrência',
    base: 'Breast Cancer (recurrence/non-recurrence)',
    type: 'Comparativo prognóstico',
    display: 'Card de seguimento e alerta de contexto',
    note: 'Ajuda a diferenciar triagem de acompanhamento quando há histórico prévio.',
  },
  {
    field: 'Histórico familiar, BRCA e fatores hormonais',
    base: 'WHO / OMS',
    type: 'Fator clínico contextual',
    display: 'Card educativo',
    note: 'Deve aparecer como contexto de atenção, sem espelho estatístico direto.',
  },
  {
    field: 'Estilo de vida',
    base: 'WHO / OMS / INCA',
    type: 'Fator preventivo',
    display: 'Card educativo e lembrete de prevenção',
    note: 'Funciona melhor como orientação preventiva do que como comparação clínica rígida.',
  },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function normalizeClassification(classification) {
  const value = String(classification ?? '').toLowerCase()

  if (value.includes('alto')) {
    return 'alto'
  }

  if (value.includes('baixo')) {
    return 'baixo'
  }

  return 'moderado'
}

function formatClassificationLabel(classification) {
  if (classification === 'alto') {
    return 'Alto'
  }

  if (classification === 'baixo') {
    return 'Baixo'
  }

  return 'Moderado'
}

function countFieldEntries(value, fallback = 0) {
  if (Array.isArray(value)) {
    return value.length
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function getAssessmentGroupScore(assessment, key, fallback = 0) {
  return clamp(toNumber(assessment?.groupScores?.[key], fallback), 0, 100)
}

function getPopulationLegendItems(score) {
  return [
    ...populationLegendBase,
    { label: `Você (${score}%)`, className: 'is-you' },
  ]
}

function getAssessmentComparisonData(assessment, score) {
  if (!assessment) {
    return fallbackComparisonData
  }

  const familyHistory = getAssessmentGroupScore(assessment, 'familyHistory', 42)
  const hormonalReproductive = getAssessmentGroupScore(assessment, 'hormonalReproductive', 38)
  const symptomsExams = getAssessmentGroupScore(assessment, 'symptomsExams', 46)
  const lifestyle = getAssessmentGroupScore(assessment, 'lifestyle', 32)
  const profile = getAssessmentGroupScore(assessment, 'profile', 34)
  const imc = clamp(Math.round(lifestyle * 0.9 + 8), 0, 100)

  return [
    { factor: 'Histórico familiar', user: familyHistory, average: 42, reference: 86 },
    { factor: 'Fator hormonal', user: hormonalReproductive, average: 38, reference: 78 },
    { factor: 'Última mamografia', user: symptomsExams, average: 46, reference: 74 },
    { factor: 'Estilo de vida', user: lifestyle, average: 32, reference: 70 },
    { factor: 'IMC', user: imc, average: 36, reference: 76 },
    { factor: 'Idade (faixa)', user: profile || score, average: 34, reference: 82 },
  ]
}

function getAssessmentPopulationData(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) {
    return fallbackPopulationRiskData
  }

  const bucketIndex = fallbackPopulationRiskData.findIndex((item) => {
    const [start, end] = item.range.split('-').map((part) => Number(part))
    return score >= start && score < (end ?? 100)
  })

  return fallbackPopulationRiskData.map((entry, index) => ({
    ...entry,
    color: index === bucketIndex ? 'var(--results-you)' : entry.color,
    group: index === bucketIndex ? 'Você' : entry.group,
  }))
}

function getFactorDetailData(assessment) {
  if (!assessment?.factorBreakdown?.length) {
    return fallbackFactorDetailData
  }

  return assessment.factorBreakdown.slice(0, 4).map((factor, index) => ({
    factor: factor.label || factor.key || `Fator ${index + 1}`,
    user: clamp(toNumber(factor.contribution, 0), 0, 100),
    average: clamp(Math.round(toNumber(factor.contribution, 0) * 0.62), 0, 100),
  }))
}

function getTopFactorInsights(assessment) {
  if (!assessment?.factorBreakdown?.length) {
    return []
  }

  return assessment.factorBreakdown.slice(0, 3).map((factor, index) => ({
    rank: index + 1,
    factor: factor.label || factor.key || `Fator ${index + 1}`,
    group: factor.groupLabel || factor.group || 'Grupo',
    contribution: clamp(toNumber(factor.contribution, 0), 0, 100),
    impact: factor.impact || 'baixo',
    normalizedValue: clamp(toNumber(factor.normalizedValue, 0), 0, 100),
  }))
}

function getCoverageSummaryCards(mappingSummary, sourcesUsed) {
  const groups = mappingSummary?.groups ?? {}
  const groupCount = Object.keys(groups).length

  return [
    {
      label: 'Campos totais',
      value: countFieldEntries(mappingSummary?.totalFields, 0),
      hint: 'Campos reconhecidos no formulário',
    },
    {
      label: 'Campos no score',
      value: countFieldEntries(mappingSummary?.scoredFields, 0),
      hint: 'Campos usados no cálculo principal',
    },
    {
      label: 'Metadados',
      value: countFieldEntries(mappingSummary?.metadataFields, 0),
      hint: 'Campos de contexto e organização',
    },
    {
      label: 'Grupos analisados',
      value: groupCount,
      hint: 'Blocos temáticos da avaliação',
    },
    {
      label: 'Fontes base',
      value: Array.isArray(sourcesUsed) ? sourcesUsed.length : 0,
      hint: 'Bases citadas no resultado',
    },
  ]
}

function getGroupCoverageData(mappingSummary) {
  const groups = mappingSummary?.groups ?? {}
  const preferredOrder = ['profile', 'familyHistory', 'symptomsExams', 'hormonalReproductive', 'lifestyle']

  return preferredOrder
    .map((groupKey) => {
      const group = groups[groupKey]
      if (!group) {
        return null
      }

      const coverage = group.totalFields > 0 ? Math.round((group.scoredFields / group.totalFields) * 100) : 0

      return {
        key: groupKey,
        label: group.step,
        totalFields: group.totalFields,
        scoredFields: group.scoredFields,
        metadataFields: group.metadataFields,
        coverage,
      }
    })
    .filter(Boolean)
}

function getProjectionData(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) {
    return fallbackProjectionData
  }

  return fallbackProjectionData.map((entry, index) => ({
    ...entry,
    noIntervention: clamp(Math.round(score + index * 7 - 8), 0, 100),
    prevention: clamp(Math.round(score + index * 3 - 10), 0, 100),
  }))
}

function getRecommendationBlocks(classification) {
  if (classification === 'alto') {
    return {
      title: 'Recomendações educativas para risco alto',
      intro:
        'Este resultado indica a necessidade de acompanhamento profissional mais próximo e atenção aos fatores que mais contribuíram para a estimativa.',
      items: [
        'Agende uma avaliação com ginecologista ou mastologista para interpretar o resultado no seu contexto clínico.',
        'Leve o relatório gerado pelo RiskCare para apoiar a conversa com o profissional de saúde.',
        'Revise fatores modificáveis, como estilo de vida, e mantenha acompanhamento preventivo regular.',
      ],
      nextSteps: [
        'Buscar avaliação profissional.',
        'Compartilhar o relatório com um especialista.',
        'Monitorar fatores de risco e manter prevenção ativa.',
      ],
    }
  }

  if (classification === 'baixo') {
    return {
      title: 'Recomendações educativas para risco baixo',
      intro:
        'A estimativa sugere um cenário mais favorável, mas a prevenção e o acompanhamento de rotina continuam importantes.',
      items: [
        'Mantenha consultas preventivas e exames de rotina conforme orientação profissional.',
        'Siga hábitos protetivos como atividade física, alimentação equilibrada e controle do IMC.',
        'Observe mudanças no corpo e procure atendimento se surgirem sintomas novos.',
      ],
      nextSteps: [
        'Continuar prevenção e rastreio.',
        'Reavaliar periodicamente o questionário.',
        'Manter hábitos saudáveis e acompanhamento regular.',
      ],
    }
  }

  return {
    title: 'Recomendações educativas para risco moderado',
    intro:
      'O resultado aponta atenção intermediária. Vale reforçar medidas preventivas e acompanhar os fatores que mais influenciam a estimativa.',
    items: [
      'Reforce exames de rotina e mantenha acompanhamento preventivo.',
      'Observe os fatores com maior contribuição no gráfico e veja quais podem ser ajustados.',
      'Converse com um profissional de saúde caso exista histórico familiar relevante ou sintomas persistentes.',
    ],
    nextSteps: [
      'Acompanhar fatores com maior impacto.',
      'Repetir a avaliação após mudanças relevantes.',
      'Buscar orientação profissional se houver dúvidas.',
    ],
  }
}

function getMainLabel(assessment) {
  if (!assessment) {
    return 'Risco moderado estimado'
  }

  return `Risco ${formatClassificationLabel(normalizeClassification(assessment.classification)).toLowerCase()} estimado`
}

function ResultsComparisonTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="results-chart-tooltip">
      <strong>{label}</strong>
      {payload.map((item) => (
        <span key={item.dataKey} style={{ '--tooltip-color': item.color }}>
          {item.name}: {item.value}%
        </span>
      ))}
    </div>
  )
}

function ResultsPopulationTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  const item = payload[0].payload

  return (
    <div className="results-chart-tooltip">
      <strong>Faixa {label}%</strong>
      <span style={{ '--tooltip-color': item.color }}>
        {item.group}: {item.percent}%
      </span>
    </div>
  )
}

function ResultsProjectionTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="results-chart-tooltip">
      <strong>{label} anos</strong>
      {payload.map((item) => (
        <span key={item.dataKey} style={{ '--tooltip-color': item.color }}>
          {item.name}: {item.value}%
        </span>
      ))}
    </div>
  )
}

function ResultsFactorTick({ payload, x, y }) {
  return (
    <text className="results-factor-chart__tick" x={x} y={y} dy={4} textAnchor="end">
      {payload.value}
    </text>
  )
}

function ResultsPage() {
  const { latestAssessment, session, signOut } = useAuth()
  const storageKey = useMemo(() => getAssessmentStorageKey(session?.user?.id), [session?.user?.id])

  const [storedAssessment, setStoredAssessment] = useState(() => readStoredAssessment(storageKey))
  const [activeTab, setActiveTab] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    return resultTabs.some((tab) => tab.id === hash) ? hash : resultTabs[0].id
  })
  const [isNewAssessmentModalOpen, setIsNewAssessmentModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  useEffect(() => {
    const syncStoredAssessment = () => setStoredAssessment(readStoredAssessment(storageKey))

    syncStoredAssessment()
    window.addEventListener('storage', syncStoredAssessment)

    return () => {
      window.removeEventListener('storage', syncStoredAssessment)
    }
  }, [storageKey])

  useEffect(() => {
    if (!latestAssessment) {
      return
    }

    setStoredAssessment(latestAssessment)
    writeStoredAssessment(storageKey, latestAssessment)
  }, [latestAssessment, storageKey])

  useEffect(() => {
    const syncActiveTab = () => {
      const hash = window.location.hash.replace('#', '')
      if (resultTabs.some((tab) => tab.id === hash)) {
        setActiveTab(hash)
      }
    }

    window.addEventListener('popstate', syncActiveTab)
    window.addEventListener('hashchange', syncActiveTab)

    return () => {
      window.removeEventListener('popstate', syncActiveTab)
      window.removeEventListener('hashchange', syncActiveTab)
    }
  }, [])

  const assessment = latestAssessment ?? storedAssessment
  const score = clamp(toNumber(assessment?.score ?? assessment?.rawScore, 34), 0, 100)
  const rawScore = clamp(toNumber(assessment?.rawScore ?? assessment?.score, score), 0, 100)
  const classification = normalizeClassification(assessment?.classification)
  const classificationLabel = formatClassificationLabel(classification)
  const factorCount = countFieldEntries(assessment?.mappingSummary?.totalFields, 12)
  const scoredCount = countFieldEntries(assessment?.mappingSummary?.scoredFields, 12)
  const metadataCount = countFieldEntries(assessment?.mappingSummary?.metadataFields, 0)
  const warnings = Array.isArray(assessment?.warnings) && assessment.warnings.length
    ? assessment.warnings
    : [
        'Esta ferramenta não realiza diagnóstico médico.',
        'Os resultados são estimativas educativas e devem ser interpretados com orientação profissional.',
      ]
  const sourcesUsed = useMemo(
    () =>
      Array.isArray(assessment?.sourcesUsed) && assessment.sourcesUsed.length
        ? assessment.sourcesUsed
        : ['INCA', 'SEER'],
    [assessment?.sourcesUsed],
  )
  const factorDetailData = useMemo(() => getFactorDetailData(assessment), [assessment])
  const comparisonData = useMemo(() => getAssessmentComparisonData(assessment, score), [assessment, score])
  const populationRiskData = useMemo(() => getAssessmentPopulationData(score), [score])
  const populationLegendItems = useMemo(() => getPopulationLegendItems(score), [score])
  const projectionData = useMemo(() => getProjectionData(score), [score])
  const recommendationBlocks = useMemo(() => getRecommendationBlocks(classification), [classification])
  const topFactorInsights = useMemo(() => getTopFactorInsights(assessment), [assessment])
  const coverageSummaryCards = useMemo(
    () => getCoverageSummaryCards(assessment?.mappingSummary, sourcesUsed),
    [assessment?.mappingSummary, sourcesUsed],
  )
  const groupCoverageData = useMemo(
    () => getGroupCoverageData(assessment?.mappingSummary),
    [assessment?.mappingSummary],
  )
  const hasStoredAssessment = Boolean(assessment)
  const adjustedByDiagnosis = rawScore !== score && Boolean(assessment)

  const handleTabClick = (event, tabId) => {
    event.preventDefault()
    setActiveTab(tabId)

    const target = document.getElementById(tabId)
    if (!target) {
      window.history.pushState({}, '', `#${tabId}`)
      return
    }

    window.history.pushState({}, '', `#${tabId}`)
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleConfirmNewAssessment = () => {
    setIsNewAssessmentModalOpen(false)
    navigateWithoutReload('/formulario')
  }

  const handleConfirmLogout = async () => {
    const result = await signOut()

    if (result?.ok) {
      setIsLogoutModalOpen(false)
      navigateWithoutReload('/')
    }
  }

  return (
    <main id="main-content" className="results-page" tabIndex={-1}>
      <AccountShell
        actionHref="/"
        actionLabel="Voltar ao início"
        description={
          hasStoredAssessment
            ? 'Seu último resultado está salvo e você pode iniciar uma nova avaliação quando quiser.'
            : 'Você pode abrir o formulário para gerar uma nova avaliação e salvar o próximo resultado.'
        }
        statusLabel={hasStoredAssessment ? 'Último resultado salvo' : 'Visualização demonstrativa'}
        title="Painel da sua avaliação"
        onLogoutClick={() => setIsLogoutModalOpen(true)}
      />
      <section className="results-card" aria-labelledby="results-title">
        <header className="results-card__header">
          <div className="results-card__summary">
            <span className="results-pill">{hasStoredAssessment ? 'Sua estimativa de risco' : 'Visualização demonstrativa'}</span>
            <h1 id="results-title">{getMainLabel(assessment)}</h1>
            <p>
              Baseado em {factorCount} fatores analisados, com {scoredCount} considerados no score
              e {metadataCount} tratados como metadados.
              {hasStoredAssessment ? ' Resultado carregado da última avaliação enviada.' : ' Abra o formulário para gerar um novo resultado.'}
              {' '}
              Classificação atual: {classificationLabel}.
            </p>
          </div>

          <div className="results-risk-index" aria-label={`Índice estimado de ${score}%`}>
            <div
              className="results-risk-index__chart"
              style={{
                background: `conic-gradient(from 180deg, var(--results-you, #d85a89) 0deg, var(--results-you, #d85a89) ${score * 3.6}deg, rgba(216, 90, 137, 0.16) ${score * 3.6}deg 360deg)`,
              }}
            >
              <span>{score}%</span>
            </div>
            <strong>Índice estimado</strong>
          </div>
        </header>

        <section className="results-executive-section" aria-labelledby="executive-title">
          <div className="results-risk-section__heading">
            <h2 id="executive-title">Leitura executiva do resultado</h2>
            <p>
              Esta visão destaca a cobertura da avaliação, os blocos do formulário e os fatores que mais
              pesaram na estimativa para que o resultado pareça um relatório, não só um número.
            </p>
          </div>

          <div className="results-executive-grid">
            <article className="results-executive-card results-executive-card--overview">
              <div className="results-executive-card__header">
                <span className="results-pill">Cobertura do formulário</span>
                <strong>Base estruturada pela avaliação enviada</strong>
              </div>

              <div className="results-metric-strip">
                {coverageSummaryCards.map((item) => (
                  <article className="results-metric-card" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                    <small>{item.hint}</small>
                  </article>
                ))}
              </div>

              <div className="results-executive-note">
                <p>
                  O score final é calculado a partir dos campos incluídos no modelo, enquanto o restante
                  ajuda a contextualizar o perfil e enriquecer a leitura do relatório.
                </p>
              </div>
            </article>

            <article className="results-executive-card results-executive-card--insights">
              <div className="results-executive-card__header">
                <span className="results-pill">Principais influências</span>
                <strong>Fatores que mais contribuíram</strong>
              </div>

              <div className="results-insight-list">
                {topFactorInsights.length ? (
                  topFactorInsights.map((item) => (
                    <div className="results-insight-item" key={`${item.factor}-${item.rank}`}>
                      <div className="results-insight-item__rank">{item.rank}</div>
                      <div className="results-insight-item__content">
                        <strong>{item.factor}</strong>
                        <span>{item.group}</span>
                        <div className="results-insight-item__meta">
                          <span>Contribuição: {item.contribution.toFixed(2)}%</span>
                          <span>Impacto: {item.impact}</span>
                        </div>
                      </div>
                      <div className="results-insight-item__bar" aria-hidden="true">
                        <i style={{ '--factor-value': `${item.normalizedValue}%` }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="results-empty-state">A avaliação será detalhada assim que houver dados salvos.</p>
                )}
              </div>
            </article>
          </div>

          <div className="results-group-grid">
            {groupCoverageData.map((group) => (
              <article className="results-group-card" key={group.key}>
                <div className="results-group-card__header">
                  <strong>{group.label}</strong>
                  <span>{group.coverage}% coberto</span>
                </div>

                <div className="results-group-card__bar" aria-hidden="true">
                  <i style={{ '--factor-value': `${group.coverage}%` }} />
                </div>

                <div className="results-group-card__meta">
                  <span>{group.scoredFields} campos no score</span>
                  <span>{group.metadataFields} metadados</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <nav className="results-tabs" aria-label="Visualizações dos resultados">
          {resultTabs.map((tab) => (
            <a
              className={activeTab === tab.id ? 'is-active' : ''}
              href={`#${tab.id}`}
              key={tab.id}
              onClick={(event) => handleTabClick(event, tab.id)}
            >
              {tab.label}
            </a>
          ))}
        </nav>

        <section className="results-matrix-section" aria-labelledby="matrix-title">
          <div className="results-risk-section__heading">
            <h2 id="matrix-title">Matriz de comparativos do resultado</h2>
            <p>
              Essa matriz resume como cada campo do formulário se conecta com as bases do MVP e
              como ele aparece na tela de resultado.
            </p>
          </div>

          <div className="results-matrix-grid">
            {comparisonMatrixSections.map((item) => (
              <article className="results-matrix-card" key={item.field}>
                <div className="results-matrix-card__header">
                  <span>{item.type}</span>
                  <strong>{item.base}</strong>
                </div>

                <h3>{item.field}</h3>
                <p>{item.display}</p>
                <small>{item.note}</small>
              </article>
            ))}
          </div>
        </section>

        <section id="fatores-risco" className="results-risk-section" aria-labelledby="risk-factors-title">
          <div className="results-risk-section__heading">
            <h2 id="risk-factors-title">Seus fatores vs. referências do MVP</h2>
            <p>
              Comparação entre seu perfil e as referências populacionais, clínicas e educativas
              priorizadas no projeto.
            </p>
          </div>

          <div className="results-legend" aria-label="Legenda do gráfico">
            {legendItems.map((item) => (
              <span key={item.className} className={item.className}>
                <i aria-hidden="true" />
                <span>{item.label}</span>
              </span>
            ))}
          </div>

          <div className="results-factor-chart-wrap">
            <div
              className="results-factor-chart"
              role="img"
              aria-label="Gráfico de barras comparando você, média brasileira e referência de alto risco"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  layout="vertical"
                  margin={{ top: 10, right: 28, bottom: 8, left: 118 }}
                  barCategoryGap="24%"
                  barGap={4}
                >
                  <CartesianGrid stroke="var(--results-grid)" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}%`}
                    tick={{
                      fill: 'var(--results-axis)',
                      fontSize: 'var(--results-chart-tick-size)',
                      fontWeight: 800,
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="factor"
                    axisLine={false}
                    tickLine={false}
                    width={112}
                    tick={<ResultsFactorTick />}
                  />
                  <Tooltip cursor={{ fill: 'var(--results-chart-hover)' }} content={<ResultsComparisonTooltip />} />
                  <Bar
                    name="Referência clínica"
                    dataKey="reference"
                    fill="var(--results-reference)"
                    radius={[0, 6, 6, 0]}
                    barSize={12}
                  />
                  <Bar
                    name="Média brasileira"
                    dataKey="average"
                    fill="var(--results-average)"
                    radius={[0, 6, 6, 0]}
                    barSize={12}
                  />
                  <Bar
                    name="Você"
                    dataKey="user"
                    fill="var(--results-user)"
                    radius={[0, 6, 6, 0]}
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section
          id="comparativo-populacional"
          className="results-population-section"
          aria-labelledby="population-title"
        >
          <div className="results-risk-section__heading">
            <h2 id="population-title">Distribuição de risco - sua posição na base de dados</h2>
            <p>
              Onde você se encontra em relação às +500.000 pacientes cadastradas. Sua posição está
              destacada.
            </p>
          </div>

          <div className="results-legend results-legend--population" aria-label="Legenda da distribuição de risco">
            {populationLegendItems.map((item) => (
              <span key={item.className} className={item.className}>
                <i aria-hidden="true" />
                <span>{item.label}</span>
              </span>
            ))}
          </div>

          <div
            className="results-population-chart"
            role="img"
            aria-label="Gráfico de barras mostrando a distribuição de risco na base de dados"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={populationRiskData}
                margin={{ top: 18, right: 10, bottom: 8, left: -20 }}
                barCategoryGap="12%"
              >
                <CartesianGrid stroke="var(--results-grid)" vertical={false} />
                <XAxis
                  dataKey="range"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: 'var(--results-axis)',
                    fontSize: 'var(--results-chart-tick-size)',
                    fontWeight: 800,
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                  tick={{
                    fill: 'var(--results-axis)',
                    fontSize: 'var(--results-chart-tick-size)',
                    fontWeight: 800,
                  }}
                  domain={[0, 30]}
                />
                <Tooltip cursor={{ fill: 'var(--results-chart-hover)' }} content={<ResultsPopulationTooltip />} />
                <Bar dataKey="percent" radius={[7, 7, 0, 0]} barSize={58}>
                  {populationRiskData.map((entry) => (
                    <Cell key={entry.range} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section id="detalhamento-fator" className="results-detail-section" aria-labelledby="factor-detail-title">
          <div className="results-risk-section__heading">
            <h2 id="factor-detail-title">Detalhamento por fator</h2>
            <p>
              Contribuição individual de cada fator no seu índice de risco vs. referência da
              população
            </p>
          </div>

          <div className="results-factor-detail-grid">
            {factorDetailData.map((item) => (
              <article className="results-factor-detail-card" key={item.factor}>
                <h3>{item.factor}</h3>

                <div className="results-factor-detail-row">
                  <span>Você</span>
                  <div className="results-factor-detail-track" aria-hidden="true">
                    <i className="is-user" style={{ '--factor-value': `${item.user}%` }} />
                  </div>
                  <strong>{item.user}%</strong>
                </div>

                <div className="results-factor-detail-row">
                  <span>Média</span>
                  <div className="results-factor-detail-track" aria-hidden="true">
                    <i className="is-average" style={{ '--factor-value': `${item.average}%` }} />
                  </div>
                  <strong>{item.average}%</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projecao-tempo" className="results-projection-section" aria-labelledby="projection-title">
          <div className="results-risk-section__heading">
            <h2 id="projection-title">Projeção ao longo do tempo</h2>
            <p>
              Estimativa da evolução do risco por faixa etária caso os fatores se mantenham
              inalterados vs. com prevenção ativa
            </p>
          </div>

          <div className="results-legend results-legend--projection" aria-label="Legenda da projeção no tempo">
            <span className="is-no-intervention">
              <i aria-hidden="true" />
              Sem intervenção
            </span>
            <span className="is-prevention">
              <i aria-hidden="true" />
              Com prevenção ativa
            </span>
            <span className="is-population">
              <i aria-hidden="true" />
              Média da população
            </span>
          </div>

          <div
            className="results-projection-chart"
            role="img"
            aria-label="Gráfico de linhas com projeção de risco ao longo do tempo"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData} margin={{ top: 18, right: 18, bottom: 22, left: -10 }}>
                <CartesianGrid stroke="var(--results-grid)" vertical={false} />
                <XAxis
                  dataKey="age"
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: 'Faixa etária',
                    position: 'insideBottom',
                    offset: -12,
                    fill: 'var(--results-axis)',
                    fontSize: 'var(--results-chart-label-size)',
                    fontWeight: 800,
                  }}
                  tick={{
                    fill: 'var(--results-axis)',
                    fontSize: 'var(--results-chart-tick-size)',
                    fontWeight: 800,
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                  label={{
                    value: 'Risco estimado',
                    angle: -90,
                    position: 'insideLeft',
                    fill: 'var(--results-axis)',
                    fontSize: 'var(--results-chart-label-size)',
                    fontWeight: 800,
                  }}
                  tick={{
                    fill: 'var(--results-axis)',
                    fontSize: 'var(--results-chart-tick-size)',
                    fontWeight: 800,
                  }}
                  domain={[0, 80]}
                />
                <Tooltip cursor={{ stroke: 'var(--results-chart-hover-line)' }} content={<ResultsProjectionTooltip />} />
                <Line
                  type="monotone"
                  name="Sem intervenção"
                  dataKey="noIntervention"
                  stroke="var(--results-no-intervention)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: 'var(--results-no-intervention)', stroke: 'var(--results-dot-stroke)', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  name="Com prevenção ativa"
                  dataKey="prevention"
                  stroke="var(--results-prevention)"
                  strokeWidth={3}
                  strokeDasharray="3 4"
                  dot={{ r: 4, fill: 'var(--results-prevention)', stroke: 'var(--results-dot-stroke)', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  name="Média da população"
                  dataKey="population"
                  stroke="var(--results-population)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: 'var(--results-population)', stroke: 'var(--results-dot-stroke)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="results-recommendations-section" aria-labelledby="recommendations-title">
          <div className="results-risk-section__heading">
            <h2 id="recommendations-title">{recommendationBlocks.title}</h2>
            <p>{recommendationBlocks.intro}</p>
          </div>

          <div className="results-recommendations-grid">
            <article className="results-recommendations-card">
              <h3>Orientações práticas</h3>
              <ul>
                {recommendationBlocks.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="results-recommendations-card results-recommendations-card--accent">
              <h3>Próximos passos</h3>
              <ol>
                {recommendationBlocks.nextSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="results-actions-section" aria-label="Ações do resultado">
          <div className="results-disclaimer">
            <strong>Nota educativa:</strong> Os gráficos utilizam dados populacionais de referência
            e não constituem diagnóstico médico. Este ferramental é educativo. Consulte sempre um
            profissional de saúde para avaliação individualizada.
            {adjustedByDiagnosis ? (
              <div style={{ marginTop: 8 }}>
                A pontuação foi ajustada para refletir diagnóstico prévio informado.
              </div>
            ) : null}
            {warnings.length ? (
              <div style={{ marginTop: 8 }}>
                {warnings.map((warning) => warning).join(' ')}
              </div>
            ) : null}
            <div style={{ marginTop: 8 }}>Fontes utilizadas: {sourcesUsed.join(', ')}.</div>
          </div>

          <div className="results-actions">
            <button type="button" className="results-action-button is-primary">
              Compartilhar com médico
            </button>
            <button type="button" className="results-action-button">
              Exportar PDF
            </button>
            <button
              type="button"
              className="results-action-button"
              onClick={() => setIsNewAssessmentModalOpen(true)}
            >
              Nova avaliação
            </button>
          </div>
        </section>

        <ConfirmModal
          cancelLabel="Cancelar"
          confirmLabel="Iniciar nova avaliação"
          description="Uma nova avaliação substitui o foco atual do painel e leva você de volta ao formulário para preencher um novo envio."
          iconLabel="↺"
          open={isNewAssessmentModalOpen}
          title="Deseja iniciar uma nova avaliação?"
          tone="primary"
          onCancel={() => setIsNewAssessmentModalOpen(false)}
          onConfirm={handleConfirmNewAssessment}
        />

        <ConfirmModal
          cancelLabel="Cancelar"
          confirmLabel="Sair"
          description="Ao sair, você volta para a tela inicial e pode precisar autenticar novamente para ver dados salvos."
          iconLabel="!"
          open={isLogoutModalOpen}
          title="Deseja sair da conta?"
          tone="danger"
          onCancel={() => setIsLogoutModalOpen(false)}
          onConfirm={() => void handleConfirmLogout()}
        />
      </section>
    </main>
  )
}

export default ResultsPage




