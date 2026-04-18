import Navbar from '../components/Navbar.jsx'

function HomePage() {
  return (
    <main className="wireframe-page">
      <Navbar />

      <section className="wireframe-block hero-block">
        <div className="wireframe-label">Hero Principal</div>
        <div className="hero-grid">
          <div className="wireframe-slot hero-copy">Area de texto principal</div>
          <div className="wireframe-slot hero-card">Card lateral de risco</div>
        </div>
      </section>

      <section className="wireframe-block stats-block">
        <div className="wireframe-label">Indicadores</div>
        <div className="stats-grid">
          <div className="wireframe-slot">Indicador 1</div>
          <div className="wireframe-slot">Indicador 2</div>
          <div className="wireframe-slot">Indicador 3</div>
          <div className="wireframe-slot">Indicador 4</div>
        </div>
      </section>

      <section className="wireframe-block cards-block">
        <div className="wireframe-label">Cards de funcionalidades</div>
        <div className="cards-grid">
          <div className="wireframe-slot feature-card">Card 1</div>
          <div className="wireframe-slot feature-card">Card 2</div>
          <div className="wireframe-slot feature-card">Card 3</div>
        </div>
      </section>

      <section className="wireframe-block footer-note-block">
        <div className="wireframe-label">Aviso inferior</div>
        <div className="wireframe-slot footer-note">Faixa de observacao</div>
      </section>
    </main>
  )
}

export default HomePage
