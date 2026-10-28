import { useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { useAuth } from '../contexts/AuthContext.jsx'
import ConfirmModal from './ConfirmModal.jsx'
import { getAssessmentStorageKey, readStoredAssessment } from '../lib/riskAssessmentStorage.js'

const NAV_LINKS = [
  { href: '/sinais-de-alerta', label: 'Sinais de alerta', activePaths: ['/sinais-de-alerta'] },
  { href: '/mamografia', label: 'Mamografia', activePaths: ['/mamografia'] },
  { href: '/perguntas-frequentes', label: 'Perguntas', activePaths: ['/perguntas-frequentes'] },
  { href: '/onde-buscar-ajuda', label: 'Onde buscar ajuda', activePaths: ['/onde-buscar-ajuda'] },
  { href: '/sobre-projeto', label: 'Sobre', activePaths: ['/sobre-projeto', '/cover'] },
]

function Navbar({ onNavigate, currentPath }) {
  const { latestAssessment, session, signOut } = useAuth()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const storageKey = session?.user?.id ? getAssessmentStorageKey(session.user.id) : null
  const localAssessment = storageKey ? readStoredAssessment(storageKey) : null
  const hasSavedAssessment = Boolean(latestAssessment || localAssessment)

  const ctaLabel = session ? (hasSavedAssessment ? 'Ver resultado' : 'Continuar avaliação') : 'Fazer avaliação'
  const ctaHref = session ? (hasSavedAssessment ? '/resultados' : '/formulario') : '/formulario'

  const handleNavigate = (event, href) => {
    setIsMenuOpen(false)

    if (typeof onNavigate !== 'function') {
      return
    }

    event.preventDefault()
    onNavigate(href)
  }

  const handleLogout = async () => {
    const result = await signOut()

    if (result?.ok) {
      setIsLogoutModalOpen(false)
      onNavigate('/')
    }
  }

  return (
    <header className={`site-navbar${isMenuOpen ? ' is-menu-open' : ''}`}>
      <div className="site-navbar__inner">
        <a className="site-navbar__brand" href="/" onClick={(event) => handleNavigate(event, '/')}>
          <img className="site-navbar__brand-logo" src="/riskcare_logo.png" alt="" aria-hidden="true" />
          <span>RiskCare</span>
        </a>

        <button
          type="button"
          className="site-navbar__menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="site-navbar-menu"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
        </button>

        <div className="site-navbar__menu" id="site-navbar-menu">
          <nav className="site-navbar__nav" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => {
              const isActive = link.activePaths?.includes(currentPath) ?? false

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={isActive ? 'is-active' : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => handleNavigate(event, link.href)}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="site-navbar__actions">
            {session ? (
              <button
                type="button"
                className="site-navbar__logout"
                onClick={() => {
                  setIsMenuOpen(false)
                  setIsLogoutModalOpen(true)
                }}
              >
                Sair
              </button>
            ) : (
              <a className="site-navbar__logout" href="/login" onClick={(event) => handleNavigate(event, '/login')}>
                Entrar
              </a>
            )}

            <a className="site-navbar__cta" href={ctaHref} onClick={(event) => handleNavigate(event, ctaHref)}>
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>

      <ConfirmModal
        cancelLabel="Cancelar"
        confirmLabel="Sair"
        description="Ao sair da conta, você volta para a tela inicial e precisará entrar novamente para acessar seus dados salvos."
        iconLabel="!"
        open={isLogoutModalOpen}
        title="Deseja realmente sair?"
        tone="danger"
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={() => void handleLogout()}
      />
    </header>
  )
}

export default Navbar
