const indicadores = [
  { value: '+50k', label: 'Avaliações realizadas' },
  { value: '12', label: 'Fatores realizados' },
  { value: '5 min', label: 'Tempo de avaliação' },
  { value: '100%', label: 'Gratuito e seguro' }
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