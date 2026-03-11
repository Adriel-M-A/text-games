import Cell from './Cell'

const Row = ({ word = '', result = [], length = 5, isCurrentRow = false }) => {
  const letters = word.split('')
  const cells = []

  for (let i = 0; i < length; i++) {
    const letter = letters[i] || ''
    const status = result[i] || (letter ? 'active' : 'empty')
    // El foco está en la celda donde se escribirá la siguiente letra
    const isFocused = isCurrentRow && i === letters.length
    
    cells.push(
      <Cell 
        key={i} 
        letter={letter} 
        status={status} 
        isFocused={isFocused} 
      />
    )
  }

  return (
    <div className="flex gap-1.5">
      {cells}
    </div>
  )
}

export default Row
