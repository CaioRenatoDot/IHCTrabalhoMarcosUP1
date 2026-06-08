import { useAuth } from '../contexts/AuthContext.jsx'
import { navigateWithoutReload } from '../utils/navigation.js'

function getDisplayName(user) {
  if (!user) {
    return 'Usuário RiskCare'
  }

  const fullName = typeof user.fullName === 'string' ? user.fullName.trim() : ''
  if (fullName) {
    return fullName
  }

  const email = typeof user.email === 'string' ? user.email.trim() : ''
  if (email) {
    return email.split('@')[0] || email
  }

  return 'Usuário RiskCare'
}

function getInitials(displayName) {
  const parts = displayName
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (!parts.length) {
    return 'RC'
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase()
}

function AccountShell({
  actionLabel,
  actionHref,
  description,
  layout = 'wide',
  statusLabel = 'Conta ativa',
  title,
  onActionClick,
  onLogoutClick,
}) {
  const { loading, session, signOut } = useAuth()

  if (loading || !session?.user) {
    return null
  }

  const user = session.user
  const displayName = getDisplayName(user)
  const initials = getInitials(displayName)
  const email = typeof user.email === 'string' ? user.email.trim() : ''

  const handleAction = (href) => {
    if (typeof onActionClick === 'function') {
      onActionClick()
      return
    }

    navigateWithoutReload(href)
  }

  const handleLogout = async () => {
    if (typeof onLogoutClick === 'function') {
      onLogoutClick()
      return
    }

    const result = await signOut()

    if (result?.ok) {
      navigateWithoutReload('/login')
    }
  }

  return (
    <aside className={`account-shell account-shell--${layout}`} aria-label="Informações da conta autenticada">
      <div className="account-shell__avatar" aria-hidden="true">
        {initials}
      </div>

      <div className="account-shell__content">
        <span className="account-shell__eyebrow">{statusLabel}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="account-shell__side">
        <div className="account-shell__meta">
          <strong>{displayName}</strong>
          {email ? <span>{email}</span> : null}
        </div>

        <div className="account-shell__actions">
          {actionLabel && actionHref ? (
            typeof onActionClick === 'function' ? (
              <button
                type="button"
                className="account-shell__action account-shell__action--primary"
                onClick={() => handleAction(actionHref)}
              >
                {actionLabel}
              </button>
            ) : (
              <a
                className="account-shell__action account-shell__action--primary"
                href={actionHref}
                onClick={(event) => {
                  event.preventDefault()
                  handleAction(actionHref)
                }}
              >
                {actionLabel}
              </a>
            )
          ) : null}

          <button
            type="button"
            className="account-shell__action account-shell__action--ghost"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>
    </aside>
  )
}

export default AccountShell
