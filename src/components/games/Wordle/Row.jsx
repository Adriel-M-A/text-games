import Cell from './Cell'

const Row = ({ word = '', result = [], length = 5 }) => {
  const letters = word.split('')
  const cells = []

  for (let i = 0; i < length; i++) {
    const letter = letters[i] || ''
    const status = result[i] || (letter ? 'active' : 'empty')
    cells.push(<Cell key={i} letter={letter} status={status} />)
  }

  return (
    <div className="flex gap-2">
      {cells}
    </div>
  )
}

export default Row
