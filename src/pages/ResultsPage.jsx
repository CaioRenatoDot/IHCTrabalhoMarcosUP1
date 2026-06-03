import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const legendItems = [
  { label: 'Voc&ecirc;', className: 'is-user' },
  { label: 'M&eacute;dia brasileira (35 - 44 anos)', className: 'is-average' },
  { label: 'Alto risco refer&ecirc;ncia', className: 'is-reference' },
]

const radarData = [
  { factor: 'Hist&oacute;rico familiar', user: 72, average: 42, reference: 86 },
  { factor: 'Fator hormonal', user: 55, average: 38, reference: 78 },
  { factor: '&Uacute;ltima mamografia', user: 36, average: 46, reference: 74 },
  { factor: 'Estilo de vida', user: 40, average: 32, reference: 70 },
  { factor: 'IMC', user: 44, average: 36, reference: 76 },
  { factor: 'Idade (faixa)', user: 68, average: 34, reference: 82 },
]

const populationRiskData = [
  { range: '0-10', percent: 12, group: 'Baixo risco', color: '#b8d996' },
  { range: '10-20', percent: 26, group: 'Baixo risco', color: '#b8d996' },
  { range: '20-30', percent: 18, group: 'Moderado', color: '#f3c66f' },
  { range: '30-40', percent: 22, group: 'Voc&ecirc;', color: '#e87486' },
  { range: '40-50', percent: 10, group: 'Moderado', color: '#f3c66f' },
  { range: '50-60', percent: 6, group: 'Alto', color: '#ef7c7f' },
  { range: '60-70', percent: 4, group: 'Alto', color: '#ef7c7f' },
  { range: '70-80', percent: 2, group: 'Alto', color: '#ef7c7f' },
  { range: '80-90', percent: 1, group: 'Alto', color: '#ef7c7f' },
  { range: '90-100', percent: 0.5, group: 'Alto', color: '#ef7c7f' },
]

const populationLegendItems = [
  { label: 'Baixo risco (0 - 20%)', className: 'is-low' },
  { label: 'Moderado (21 - 50%)', className: 'is-moderate' },
  { label: 'Alto (51 - 100%)', className: 'is-high' },
  { label: 'Voc&ecirc; (32%)', className: 'is-you' },
]

function ResultsComparisonTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="results-chart-tooltip">
      <strong dangerouslySetInnerHTML={{ __html: label }} />
      {payload.map((item) => (
        <span key={item.dataKey} style={{ '--tooltip-color': item.color }}>
          <span dangerouslySetInnerHTML={{ __html: item.name }} />: {item.value}%
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
        <span dangerouslySetInnerHTML={{ __html: item.group }} />: {item.percent}%
      </span>
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
      dangerouslySetInnerHTML={{ __html: payload.value }}
    />
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

          <div className="results-risk-index" aria-label="Indice estimado de 34%">
            <div className="results-risk-index__chart">
              <span>34%</span>
            </div>
            <strong>&Iacute;ndice estimado</strong>
          </div>
        </header>

        <nav className="results-tabs" aria-label="Visualiza&ccedil;&otilde;es dos resultados">
          <a className="is-active" href="#fatores-risco">
            Fatores de risco
          </a>
          <a href="#comparativo-populacional">Comparativo populacional</a>
          <a href="#evolucao-temporal">Evolu&ccedil;&atilde;o temporal</a>
        </nav>

        <section
          id="fatores-risco"
          className="results-risk-section"
          aria-labelledby="risk-factors-title"
        >
          <div className="results-risk-section__heading">
            <h2 id="risk-factors-title">Seus fatores vs. m&eacute;dia da popula&ccedil;&atilde;o</h2>
            <p>
              Compara&ccedil;&atilde;o entre seu perfil e mulheres na mesma faixa et&aacute;ria
              (35 - 44 anos) no banco de dados nacional
            </p>
          </div>

          <div className="results-legend" aria-label="Legenda do gr&aacute;fico">
            {legendItems.map((item) => (
              <span key={item.className} className={item.className}>
                <i aria-hidden="true" />
                <span dangerouslySetInnerHTML={{ __html: item.label }} />
              </span>
            ))}
          </div>

          <div className="results-factor-chart-wrap">
            <div
              className="results-factor-chart"
              role="img"
              aria-label="Grafico de barras comparando voce, media brasileira e referencia de alto risco"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={radarData}
                  layout="vertical"
                  margin={{ top: 10, right: 28, bottom: 8, left: 118 }}
                  barCategoryGap="24%"
                  barGap={4}
                >
                  <CartesianGrid stroke="#f7e7ed" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: '#8a6070', fontSize: 11, fontWeight: 800 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="factor"
                    axisLine={false}
                    tickLine={false}
                    width={112}
                    tick={<ResultsFactorTick />}
                  />
                  <Tooltip cursor={{ fill: 'rgba(196, 81, 122, 0.05)' }} content={<ResultsComparisonTooltip />} />
                  <Bar
                    name="Alto risco refer&ecirc;ncia"
                    dataKey="reference"
                    fill="#f8d5df"
                    radius={[0, 6, 6, 0]}
                    barSize={12}
                  />
                  <Bar
                    name="M&eacute;dia brasileira"
                    dataKey="average"
                    fill="#f2a7c0"
                    radius={[0, 6, 6, 0]}
                    barSize={12}
                  />
                  <Bar
                    name="Voc&ecirc;"
                    dataKey="user"
                    fill="#c4517a"
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
              Distribui&ccedil;&atilde;o de risco - sua posi&ccedil;&atilde;o na base de dados
            </h2>
            <p>
              Onde voc&ecirc; se encontra em rela&ccedil;&atilde;o &agrave;s +500.000 pacientes
              cadastradas. Sua posi&ccedil;&atilde;o est&aacute; destacada.
            </p>
          </div>

          <div
            className="results-legend results-legend--population"
            aria-label="Legenda da distribui&ccedil;&atilde;o de risco"
          >
            {populationLegendItems.map((item) => (
              <span key={item.className} className={item.className}>
                <i aria-hidden="true" />
                <span dangerouslySetInnerHTML={{ __html: item.label }} />
              </span>
            ))}
          </div>

          <div
            className="results-population-chart"
            role="img"
            aria-label="Grafico de barras mostrando a distribuicao de risco na base de dados"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={populationRiskData}
                margin={{ top: 18, right: 10, bottom: 8, left: -20 }}
                barCategoryGap="12%"
              >
                <CartesianGrid stroke="#f7e7ed" vertical={false} />
                <XAxis
                  dataKey="range"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#8a6070', fontSize: 11, fontWeight: 800 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: '#8a6070', fontSize: 11, fontWeight: 800 }}
                  domain={[0, 30]}
                />
                <Tooltip cursor={{ fill: 'rgba(196, 81, 122, 0.05)' }} content={<ResultsPopulationTooltip />} />
                <Bar dataKey="percent" radius={[7, 7, 0, 0]} barSize={58}>
                  {populationRiskData.map((entry) => (
                    <Cell key={entry.range} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </section>
    </main>
  )
}

export default ResultsPage
