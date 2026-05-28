function FeatureCard({ icon, title, description, iconBg = '#fce7f3', iconColor = '#ec4899' }) {
  return (
    <div style={{
      backgroundColor: 'rgba(167, 61, 110, 0.02)',
      borderRadius: '16px',
      padding: '24px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      border: '1px solid #f3d6e4',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      width: '100%',
      minHeight: '220px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        minWidth: '56px',
        borderRadius: '14px',
        backgroundColor: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: iconColor,
      }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '1.08rem', fontWeight: 700, color: '#8A6070' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#8A6070', lineHeight: 1.45 }}>{description}</p>
      </div>
    </div>
  )
}
 
export default FeatureCard
