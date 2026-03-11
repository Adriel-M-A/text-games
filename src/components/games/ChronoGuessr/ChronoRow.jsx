import ChronoCell from './ChronoCell'

const ChronoRow = ({ word = '', result = [], isCurrentRow = false, cellSize }) => {
  // Estructura: 2 (DD) + 1 (-) + 2 (MM) + 1 (-) + 4 (AAAA) = 10 caracteres
  const format = [0, 1, 'sep', 2, 3, 'sep', 4, 5, 6, 7]
  const digits = word.split('')
  
  const cells = format.map((pos, i) => {
    if (pos === 'sep') {
      return (
        <ChronoCell 
          key={i} 
          character="-" 
          status="separator" 
          size={cellSize} 
        />
      )
    }

    const digit = digits[pos] || ''
    const status = result[pos] || (digit ? 'active' : 'empty')
    // El foco está en el siguiente dígito a escribir
    const isFocused = isCurrentRow && pos === digits.length

    return (
      <ChronoCell 
        key={i} 
        character={digit} 
        status={status} 
        isFocused={isFocused} 
        size={cellSize}
      />
    )
  })

  return (
    <div 
      className="flex gap-1 items-center" 
      style={{ gap: `calc(${cellSize} * 0.1)` }}
    >
      {cells}
    </div>
  )
}

export default ChronoRow
