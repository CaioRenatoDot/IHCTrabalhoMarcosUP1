import Navbar from '../components/Navbar.jsx'
import SaibaMaisButton from '../components/SaibaMaisButton.jsx'
import FeatureCard from '../components/FeatureCard.jsx'

const ClockIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const ChartIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)



function HomePage() {
  return (
    <main className="wireframe-page">
      <Navbar />

      <section className="wireframe-block hero-block">
        <div className="wireframe-label">Hero Principal</div>
        <div className="hero-grid">
          <div className="wireframe-slot hero-copy">
            <div className="hero-copy__content">
              <div className="hero-copy__label">Area de texto principal</div>
              <div className="hero-copy__actions">
                <SaibaMaisButton />
              </div>
            </div>
          </div>
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

      <section className="cards-block">
        <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', padding: '40px 32px' }}>
          <div style={{ flex: 1 }}>
            <FeatureCard
              icon={<ClockIcon />}
              title="Análise rápida"
              description="Responda um questionário curto e receba sua estimativa em minutos, sem burocracia"
              iconBg="#fce7f3"
              iconColor="#e879a0"
            />
          </div>
          <div style={{ flex: 1 }}>
            <FeatureCard
              icon={<ShieldIcon />}
              title="Questionário detalhado"
              description="Perguntas criadas com base em sintomas mais comuns do câncer de mama"
              iconBg="#dbeafe"
              iconColor="#6098f2"
            />
          </div>
          <div style={{ flex: 1 }}>
            <FeatureCard
              icon={<ChartIcon />}
              title="Estatística de risco"
              description="Ao finalizar receba a estatítica detalhada com base nas respostas das perguntas"
              iconBg="#d1fae5"
              iconColor="#34d399"
            />
          </div>
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
