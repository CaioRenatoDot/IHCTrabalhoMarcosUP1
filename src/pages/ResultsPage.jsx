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

const legendItems = [
  { label: 'Você', className: 'is-user' },
  { label: 'Média brasileira (35 - 44 anos)', className: 'is-average' },
  { label: 'Alto risco referência', className: 'is-reference' },
]

const radarData = [
  { factor: 'Histórico familiar', user: 72, average: 42, reference: 86 },
  { factor: 'Fator hormonal', user: 55, average: 38, reference: 78 },
  { factor: 'Última mamografia', user: 36, average: 46, reference: 74 },
  { factor: 'Estilo de vida', user: 40, average: 32, reference: 70 },
  { factor: 'IMC', user: 44, average: 36, reference: 76 },
  { factor: 'Idade (faixa)', user: 68, average: 34, reference: 82 },
]

const populationRiskData = [
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

const populationLegendItems = [
  { label: 'Baixo risco (0 - 20%)', className: 'is-low' },
  { label: 'Moderado (21 - 50%)', className: 'is-moderate' },
  { label: 'Alto (51 - 100%)', className: 'is-high' },
  { label: 'Você (32%)', className: 'is-you' },
]

const factorDetailData = [
  { factor: 'Histórico familiar', user: 78, average: 22 },
  { factor: 'Fator hormonal', user: 65, average: 38 },
  { factor: 'Estilo de vida', user: 58, average: 42 },
  { factor: 'Última mamografia', user: 45, average: 35 },
]

const projectionData = [
  { age: 35, noIntervention: 25, prevention: 25, population: 22 },
  { age: 40, noIntervention: 32, prevention: 26, population: 24 },
  { age: 45, noIntervention: 42, prevention: 27, population: 26 },
  { age: 50, noIntervention: 52, prevention: 28, population: 29 },
  { age: 55, noIntervention: 61, prevention: 30, population: 32 },
  { age: 60, noIntervention: 68, prevention: 33, population: 35 },
  { age: 65, noIntervention: 72, prevention: 35, population: 38 },
]

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
    <text
      className="results-factor-chart__tick"
      x={x}
      y={y}
      dy={4}
      textAnchor="end"
    >
      {payload.value}
    </text>
  )
}

function ResultsPage() {
  return (
    <main id="main-content" className="results-page" tabIndex={-1}>
      <section className="results-card" aria-labelledby="results-title">
        <header className="results-card__header">
          <div className="results-card__summary">
            <span className="results-pill">Sua estimativa de risco</span>
            <h1 id="results-title">Risco moderado estimado</h1>
            <p>Baseado em 12 fatores analisados com dados de +50k casos no Brasil</p>
          </div>

          <div className="results-risk-index" aria-label="Índice estimado de 34%">
            <div className="results-risk-index__chart">
              <span>34%</span>
            </div>
            <strong>Índice estimado</strong>
          </div>
        </header>

        <nav className="results-tabs" aria-label="Visualizações dos resultados">
          <a className="is-active" href="#fatores-risco">
            Fatores de risco
          </a>
          <a href="#comparativo-populacional">Comparativo populacional</a>
          <a href="#detalhamento-fator">Detalhamento por fator</a>
        </nav>

        <section
          id="fatores-risco"
          className="results-risk-section"
          aria-labelledby="risk-factors-title"
        >
          <div className="results-risk-section__heading">
            <h2 id="risk-factors-title">Seus fatores vs. média da população</h2>
            <p>
              Comparação entre seu perfil e mulheres na mesma faixa etária
              (35 - 44 anos) no banco de dados nacional
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
                  data={radarData}
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
                    name="Alto risco referência"
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
            <h2 id="population-title">
              Distribuição de risco - sua posição na base de dados
            </h2>
            <p>
              Onde você se encontra em relação às +500.000 pacientes cadastradas. Sua posição
              está destacada.
            </p>
          </div>

          <div
            className="results-legend results-legend--population"
            aria-label="Legenda da distribuição de risco"
          >
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

        <section
          id="detalhamento-fator"
          className="results-detail-section"
          aria-labelledby="factor-detail-title"
        >
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

        <section
          id="projecao-tempo"
          className="results-projection-section"
          aria-labelledby="projection-title"
        >
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

        <section className="results-actions-section" aria-label="Ações do resultado">
          <div className="results-disclaimer">
            <strong>Nota educativa:</strong> Os gráficos utilizam dados populacionais de referência
            e não constituem diagnóstico médico. Este ferramental é educativo. Consulte sempre um
            profissional de saúde para avaliação individualizada.
          </div>

          <div className="results-actions">
            <button type="button" className="results-action-button is-primary">
              Compartilhar com médico
            </button>
            <button type="button" className="results-action-button">
              Exportar PDF
            </button>
            <a className="results-action-button" href="/login">
              Nova avaliação
            </a>
          </div>
        </section>
      </section>
    </main>
  )
}

export default ResultsPage
