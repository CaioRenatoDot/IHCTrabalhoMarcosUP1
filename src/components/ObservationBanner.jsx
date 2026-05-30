function ObservationBanner() {
  return (
    <section className="observation-banner" aria-label="Aviso importante">
      <div className="observation-banner__icon" aria-hidden="true">
        !
      </div>
      <p className="observation-banner__text">
        Esta ferramenta <strong>não realiza diagnóstico médico</strong> - os resultados são apenas
        estimativas informativas.
      </p>
    </section>
  )
}

export default ObservationBanner
