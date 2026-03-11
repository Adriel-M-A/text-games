const ChronoCell = ({ character = '', status = 'empty', isFocused = false, size = '3.5rem' }) => {
  const statusStyles = {
    empty: 'border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white',
    correct: 'bg-green-600 dark:bg-green-500 border-green-700 dark:border-green-400 text-white dark:text-black font-black',
    present: 'bg-yellow-500 dark:bg-yellow-400 border-yellow-600 dark:border-yellow-300 text-white dark:text-black font-black',
    absent: 'border-transparent bg-gray-50 dark:bg-gray-950 text-gray-300 dark:text-gray-700',
    active: 'border-black dark:border-white text-black dark:text-white ring-px ring-black dark:ring-white ring-inset',
    separator: 'border-transparent bg-transparent text-black/20 dark:text-white/20 font-black'
  }

  const isSeparator = character === '-'
  const finalWidth = isSeparator ? `calc(${size} * 0.4)` : size

  const focusStyles = isFocused && status === 'empty' 
    ? 'border-black dark:border-white ring-2 ring-black/20 dark:ring-white/20 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-[1.02]' 
    : ''

  return (
    <div 
      className={`
        border flex items-center justify-center 
        font-bold uppercase transition-all duration-75
        ${statusStyles[status]}
        ${focusStyles}
      `}
      style={{ 
        width: finalWidth, 
        height: size,
        fontSize: isSeparator ? `calc(${size} * 0.45)` : `calc(${size} * 0.5)`
      }}
    >
      {character}
    </div>
  )
}

export default ChronoCell
