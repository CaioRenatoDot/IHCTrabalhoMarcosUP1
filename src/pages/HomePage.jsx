import { useAuth } from '../contexts/AuthContext.jsx'
import RouteLoadingPage from '../components/RouteLoadingPage.jsx'
import {
  AssessmentCard,
  FactsCard,
  NewsList,
  ScreeningCard,
  ShortcutsCard,
  SupportCard,
  TipBox,
} from '../components/home/HomeBlocks.jsx'
import {
  FeaturedNews,
  HelpCard,
  NextSteps,
  NumbersPanel,
  PortalHero,
  StartHereBand,
} from '../components/home/PortalSections.jsx'
import { getAssessmentStorageKey, readStoredAssessment } from '../lib/riskAssessmentStorage.js'

function getFirstName(user) {
  const fullName = typeof user?.fullName === 'string' ? user.fullName.trim() : ''
  if (fullName) {
    return fullName.split(/\s+/)[0]
  }

  const email = typeof user?.email === 'string' ? user.email.trim() : ''
  return email ? email.split('@')[0] : ''
}

function getAssessmentDate(assessment) {
  const rawDate = assessment?.meta?.createdAt ?? assessment?.meta?.submittedAt
  if (!rawDate) {
    return null
  }

  const date = new Date(rawDate)
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

// A idade informada na avaliação vem no detalhamento por fator (campo "age").
function getAssessmentAge(assessment) {
  const ageFactor = assessment?.factorBreakdown?.find?.((factor) => factor.key === 'age')
  const age = Number.parseInt(String(ageFactor?.originalValue ?? ''), 10)
  return Number.isFinite(age) ? age : null
}

// Home de quem não entrou: portal público (docs/design/home-v2/referencia.png).
function PortalHome() {
  return (
    <main id="main-content" className="home-page home-page--portal" tabIndex={-1}>
      <PortalHero />

      <div className="portal-container portal-stack">
        <StartHereBand />
        <TipBox />
        <div className="portal-columns">
          <FeaturedNews />
          <aside className="portal-aside" aria-label="Números e ajuda">
            <NumbersPanel />
            <HelpCard />
          </aside>
        </div>
      </div>

      <NextSteps />
    </main>
  )
}

// Home de quem entrou: painel com dados da própria conta.
function DashboardHome({ user, assessment }) {
  const firstName = getFirstName(user)
  const hasAssessment = Boolean(assessment)

  return (
    <main id="main-content" className="home-page" tabIndex={-1}>
      <div className="home-container">
        <header className="home-intro">
          <h1 className="home-intro__title">{firstName ? `Olá, ${firstName}!` : 'Olá!'}</h1>
          <p className="home-intro__lead">
            {hasAssessment
              ? 'Aqui está um resumo para você acompanhar seus cuidados.'
              : 'Que bom ter você aqui. Comece pela avaliação para receber orientações personalizadas.'}
          </p>
        </header>

        <div className="home-grid">
          <AssessmentCard hasAssessment={hasAssessment} assessmentDate={getAssessmentDate(assessment)} />
          <ScreeningCard age={getAssessmentAge(assessment)} />
          <ShortcutsCard />
        </div>

        <TipBox />

        <div className="home-columns">
          <NewsList />
          <aside className="home-aside" aria-label="Apoio e números">
            <SupportCard />
            <FactsCard />
          </aside>
        </div>
      </div>
    </main>
  )
}

function HomePage() {
  const { latestAssessment, loading, session } = useAuth()

  if (loading) {
    return <RouteLoadingPage label="Carregando" />
  }

  if (!session?.user) {
    return <PortalHome />
  }

  const storageKey = getAssessmentStorageKey(session.user.id)
  const assessment = latestAssessment ?? readStoredAssessment(storageKey)

  return <DashboardHome user={session.user} assessment={assessment} />
}

export default HomePage
