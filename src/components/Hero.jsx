function Hero({ eyebrow, title, description }) {
  return (
    <section className="hero">
      <span className="hero__eyebrow">{eyebrow}</span>
      <h1 className="hero__title">{title}</h1>
      <p className="hero__description">{description}</p>
    </section>
  )
}

export default Hero
