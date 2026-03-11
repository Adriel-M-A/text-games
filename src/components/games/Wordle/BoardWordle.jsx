import Row from './Row'

const BoardWordle = ({ guesses, currentGuess, maxAttempts = 6, length = 5 }) => {
  const rows = []

  // Filas completadas
  guesses.forEach((guess, index) => {
    rows.push(<Row key={`guess-${index}`} word={guess.word} result={guess.result} length={length} />)
  })

  // Fila actual (si no se ha terminado el juego)
  if (rows.length < maxAttempts) {
    rows.push(<Row key="current" word={currentGuess} length={length} isCurrentRow={true} />)
  }

  // Filas vacías restantes
  for (let i = rows.length; i < maxAttempts; i++) {
    rows.push(<Row key={`empty-${i}`} length={length} />)
  }

  return (
    <div className="flex flex-col gap-1.5 bg-transparent">
      {rows}
    </div>
  )
}

export default BoardWordle
