import Row from './Row'

const BoardWordle = ({ guesses, currentGuess, maxAttempts = 6, length = 5 }) => {
  // Calcular tamaño de celda dinámico
  // Base: un poco más de 3.5rem para que el estándar sea similar al original (64px aprox)
  const baseSize = 3.8
  const horizontalScale = 5 / length
  const verticalScale = 6 / maxAttempts
  const scaleFactor = Math.min(horizontalScale, verticalScale, 1)
  
  // El tamaño se calcula como base * escala, y luego se aplica una variable para móviles
  const cellSize = `calc(${baseSize * scaleFactor}rem * var(--mobile-scale, 1))`

  const rows = []

  // Filas completadas
  guesses.forEach((guess, index) => {
    rows.push(
      <Row 
        key={`guess-${index}`} 
        word={guess.word} 
        result={guess.result} 
        length={length} 
        cellSize={cellSize}
      />
    )
  })

  // Fila actual (si no se ha terminado el juego)
  if (rows.length < maxAttempts) {
    rows.push(
      <Row 
        key="current" 
        word={currentGuess} 
        length={length} 
        isCurrentRow={true} 
        cellSize={cellSize}
      />
    )
  }

  // Filas vacías restantes
  for (let i = rows.length; i < maxAttempts; i++) {
    rows.push(<Row key={`empty-${i}`} length={length} cellSize={cellSize} />)
  }

  return (
    <div className="flex flex-col bg-transparent items-center">
      <style>{`
        .wordle-board-container {
          --mobile-scale: 1;
          display: flex;
          flex-direction: column;
          gap: calc(${cellSize} * 0.1);
        }
        @media (max-width: 640px) {
          .wordle-board-container {
            --mobile-scale: 0.75;
          }
        }
      `}</style>
      <div className="wordle-board-container">
        {rows}
      </div>
    </div>
  )
}

export default BoardWordle
