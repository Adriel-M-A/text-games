import ChronoRow from './ChronoRow'

const BoardChrono = ({ guesses, currentGuess, maxAttempts = 6 }) => {
  // Calcular tamaño de celda dinámico (siempre 8 dígitos + 2 separadores = 10 slots)
  const baseSize = 3.2
  const verticalScale = 6 / maxAttempts
  // La escala horizontal es fija porque la fecha siempre tiene 8 dígitos + separadores
  const scaleFactor = Math.min(verticalScale, 1)
  
  const cellSize = `calc(${baseSize * scaleFactor}rem * var(--mobile-scale, 1))`

  const rows = []

  // Intentos completados
  guesses.forEach((guess, index) => {
    rows.push(
      <ChronoRow 
        key={`guess-${index}`} 
        word={guess.word} 
        result={guess.result} 
        cellSize={cellSize}
      />
    )
  })

  // Intento actual
  if (rows.length < maxAttempts) {
    rows.push(
      <ChronoRow 
        key="current" 
        word={currentGuess} 
        isCurrentRow={true} 
        cellSize={cellSize}
      />
    )
  }

  // Filas vacías
  for (let i = rows.length; i < maxAttempts; i++) {
    rows.push(<ChronoRow key={`empty-${i}`} cellSize={cellSize} />)
  }

  return (
    <div className="flex flex-col bg-transparent items-center">
      <style>{`
        .chrono-board-container {
          --mobile-scale: 1;
          display: flex;
          flex-direction: column;
          gap: calc(${cellSize} * 0.1);
        }
        @media (max-width: 640px) {
          .chrono-board-container {
            --mobile-scale: 0.7;
          }
        }
      `}</style>
      <div className="chrono-board-container">
        {rows}
      </div>
    </div>
  )
}

export default BoardChrono
