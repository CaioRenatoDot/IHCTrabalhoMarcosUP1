function SkipLink({ targetId = 'main-content', label = 'Pular para o conteúdo principal' }) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      {label}
    </a>
  )
}

export default SkipLink
