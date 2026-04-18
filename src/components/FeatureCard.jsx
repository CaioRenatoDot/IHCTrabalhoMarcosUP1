function FeatureCard({ icon, title, description, iconBg = '#fce7f3', iconColor = '#ec4899' }) {
  return (
    <div style={{
      backgroundColor: 'rgba(167, 61, 110, 0.02)',
      borderRadius: '20px',
      padding: '40px 36px',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      border: '1px solid #f3d6e4',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      width: '100%',
      height:'320px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        minWidth: '64px',
        borderRadius: '18px',
        backgroundColor: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: iconColor,
      }}>
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#8A6070' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '18px', color: '#8A6070', lineHeight: 1.7 }}>{description}</p>
      </div>
    </div>
  )
}
 
export default FeatureCard