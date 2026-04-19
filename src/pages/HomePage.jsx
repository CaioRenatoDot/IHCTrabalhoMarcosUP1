import Navbar from '../components/Navbar.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import Indicadores from '../components/Indicadores.jsx'
import ObservationBanner from '../components/ObservationBanner.jsx'
import ConscientizacaoPrevencaoSection from '../components/ConscientizacaoPrevencaoSection.jsx'

const ClockIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
)

const ChartIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

function HomePage() {
  return (
    <main className="wireframe-page">
      <Navbar />

      <ConscientizacaoPrevencaoSection />

      <Indicadores />

      <section className="cards-block">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            padding: '40px 32px',
          }}
        >
          <div style={{ flex: 1 }}>
            <FeatureCard
              icon={<ClockIcon />}
              title={'An\u00E1lise r\u00E1pida'}
              description={
                'Responda um question\u00E1rio curto e receba sua estimativa em minutos, sem burocracia'
              }
              iconBg="#fce7f3"
              iconColor="#e879a0"
            />
          </div>
          <div style={{ flex: 1 }}>
            <FeatureCard
              icon={<ShieldIcon />}
              title={'Question\u00E1rio detalhado'}
              description={
                'Perguntas criadas com base em sintomas mais comuns do c\u00E2ncer de mama'
              }
              iconBg="#dbeafe"
              iconColor="#6098f2"
            />
          </div>
          <div style={{ flex: 1 }}>
            <FeatureCard
              icon={<ChartIcon />}
              title={'Estat\u00EDstica de risco'}
              description={
                'Ao finalizar receba a estat\u00EDstica detalhada com base nas respostas das perguntas'
              }
              iconBg="#d1fae5"
              iconColor="#34d399"
            />
          </div>
        </div>
      </section>

      <ObservationBanner />
    </main>
  )
}

export default HomePage
