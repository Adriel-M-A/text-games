const HEAD = (
  <circle
    key="head"
    cx="200"
    cy="80"
    r="30"
    stroke="currentColor"
    strokeWidth="8"
    fill="transparent"
  />
)

const BODY = (
  <line
    key="body"
    x1="200"
    y1="110"
    x2="200"
    y2="190"
    stroke="currentColor"
    strokeWidth="8"
  />
)

const LEFT_ARM = (
  <line
    key="left-arm"
    x1="200"
    y1="130"
    x2="160"
    y2="160"
    stroke="currentColor"
    strokeWidth="8"
  />
)

const RIGHT_ARM = (
  <line
    key="right-arm"
    x1="200"
    y1="130"
    x2="240"
    y2="160"
    stroke="currentColor"
    strokeWidth="8"
  />
)

const LEFT_LEG = (
  <line
    key="left-leg"
    x1="200"
    y1="190"
    x2="170"
    y2="240"
    stroke="currentColor"
    strokeWidth="8"
  />
)

const RIGHT_LEG = (
  <line
    key="right-leg"
    x1="200"
    y1="190"
    x2="230"
    y2="240"
    stroke="currentColor"
    strokeWidth="8"
  />
)

const BODY_PARTS = [HEAD, BODY, LEFT_LEG, RIGHT_LEG, LEFT_ARM, RIGHT_ARM]

const HangmanDrawing = ({ numberOfMistakes }) => {
  return (
    <div className="relative w-full max-w-[280px] aspect-square">
      <svg
        viewBox="0 0 300 300"
        className="text-black dark:text-white transition-colors duration-300"
      >
        {/* Horca */}
        <line x1="20" y1="280" x2="140" y2="280" stroke="currentColor" strokeWidth="8" />
        <line x1="80" y1="280" x2="80" y2="20" stroke="currentColor" strokeWidth="8" />
        <line x1="80" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="8" />
        <line x1="200" y1="20" x2="200" y2="50" stroke="currentColor" strokeWidth="8" />

        {/* Personaje */}
        {BODY_PARTS.slice(0, numberOfMistakes)}
      </svg>
    </div>
  )
}

export default HangmanDrawing
