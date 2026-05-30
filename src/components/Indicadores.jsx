const indicadores = [
  { value: '+50k', label: 'Casos novos/ano no Brasil' },
  { value: '12', label: 'Fatores de risco analisados' },
  { value: '5 min', label: 'Tempo m\u00E9dio do question\u00E1rio' },
  { value: '100%', label: 'Gratuito e confidencial' },
]

function Indicadores() {
  return (
    <section className="indicator-row">
      <div className="indicator-list">
        {indicadores.map((item, index) => (
          <div key={item.label} className="indicator-item">
            <div className="indicator-value">{item.value}</div>
            <div className="indicator-label">{item.label}</div>
            {index < indicadores.length - 1 && <span className="indicator-separator" />}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Indicadores
