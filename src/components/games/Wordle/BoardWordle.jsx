import Row from './Row'

const BoardWordle = ({ guesses, currentGuess, maxAttempts = 6, length = 5 }) => {
  const rows = []

  // Filas completadas
  guesses.forEach((guess, index) => {
    rows.push(<Row key={`guess-${index}`} word={guess.word} result={guess.result} length={length} />)
  })

  // Fila actual (si no se ha terminado el juego)
  if (rows.length < maxAttempts) {
    rows.push(<Row key="current" word={currentGuess} length={length} />)
  }

  // Filas vacías restantes
  for (let i = rows.length; i < maxAttempts; i++) {
    rows.push(<Row key={`empty-${i}`} length={length} />)
  }

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-50/50 dark:bg-gray-800/10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-inner">
      {rows}
    </div>
  )
}

export default BoardWordle
