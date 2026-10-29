// Logo do RiskCare em SVG, redesenhada a partir de public/riskcare_logo.png (ver docs/design/logo.md).
// O laço é um único caminho com contorno, o que permite animá-lo "sendo desenhado".
// Cores e animação ficam em src/styles/logo.css.

const RIBBON_PATH =
  'M49.6 83.4 C47.8 76 43.4 68 37.8 60.6 C33.6 53 28.6 45.6 27.6 35.6 C26.6 25.6 29.6 15.8 38 15.2 C44 15.2 49 19.5 51.2 24 C53.6 19.4 58.5 15.6 64.6 15.4 C72 15.2 77.8 21 77.8 29 C77.8 37 73 44 66 50.5'
const FOLD_PATH = 'M37.2 58.6 C30.4 51 24.4 44 23.4 34.6 C22.8 28 24 22.6 26.6 19.4'
const TAIL_PATH = 'M37.6 57.4 Q40.6 61.6 43 66.4 Q32.6 75.2 22.8 83.6 L23.2 76.4 L15.6 75.4 Q27.4 67.4 37.6 57.4 Z'
const HAND_PATH =
  'M47.6 56.6 C52 52 58 50 63.6 48.2 C65.6 47.6 66.2 50 64.4 51 C61 52.6 58 54.3 57.6 56.8 C57.4 58 59 58.3 61 57.6 C68 55 74 50 78.6 45.2 C79.6 44.2 81.2 45 80.6 46.4 C77 53.5 73 61 64.5 66 C60 68.6 56 70.6 53.2 71.8 Z'

function RiskCareLogo({ animated = false, className = '', title }) {
  const classes = ['rc-logo', animated ? 'rc-logo--animated' : '', className].filter(Boolean).join(' ')

  return (
    <svg
      className={classes}
      viewBox="9 9 80 80"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path className="rc-logo__hand" d={HAND_PATH} />
      <path className="rc-logo__tail" d={TAIL_PATH} />
      <path className="rc-logo__fold" d={FOLD_PATH} pathLength="1" />
      <path className="rc-logo__gap" d={RIBBON_PATH} pathLength="1" />
      <path className="rc-logo__ribbon" d={RIBBON_PATH} pathLength="1" />
    </svg>
  )
}

export default RiskCareLogo
