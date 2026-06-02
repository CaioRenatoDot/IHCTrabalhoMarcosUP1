function FeatureCard({
  icon,
  title,
  description,
  iconBg = 'var(--rc-rose-light)',
  iconColor = 'var(--rc-rose)',
}) {
  return (
    <div className="feature-card-panel">
      <div
        className="feature-card-icon"
        style={{
          backgroundColor: iconBg,
          color: iconColor,
        }}
      >
        {icon}
      </div>
      <div className="feature-card-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
 
export default FeatureCard
