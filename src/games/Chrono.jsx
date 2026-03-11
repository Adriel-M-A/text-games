import { useEffect } from 'react'
import GameLayout from '../layouts/GameLayout'
import ConfigLayout from '../layouts/ConfigLayout'
import BoardChrono from '../components/games/ChronoGuessr/BoardChrono'
import NumericKeyboard from '../components/games/ChronoGuessr/NumericKeyboard'
import DifficultySelector from '../components/games/Wordle/DifficultySelector'
import { AlertCircle } from 'lucide-react'
import GameOverModal from '../components/common/GameOverModal'
import { ChronoProvider, useChronoContext } from '../context/ChronoContext'

const ChronoContent = () => {
  const {
    gameState,
    difficulty,
    solution,
    currentGuess,
    guesses,
    isWinner,
    error,
    difficulties,
    maxAttempts,
    setDifficulty,
    startGame,
    resetGame,
    goToSetup,
    handleKeyUp,
    usedNumbers
  } = useChronoContext()

  useEffect(() => {
    if (gameState !== 'playing') return
    const listener = (e) => handleKeyUp({ key: e.key })
    window.addEventListener('keyup', listener)
    return () => window.removeEventListener('keyup', listener)
  }, [handleKeyUp, gameState])

  if (gameState === 'setup') {
    return (
      <ConfigLayout 
        title="ChronoGuessr" 
        onStart={startGame}
        startLabel="INICIAR PARTIDA"
      >
        <div className="flex flex-col gap-8">
          <div className="pt-8 pb-10 px-2 space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-widest">
              AJUSTES_DE_PARTIDA
            </h2>
            <p className="text-xs font-bold uppercase opacity-40">Personaliza tu experiencia de juego</p>
          </div>

          <DifficultySelector 
            levels={difficulties}
            currentLevel={difficulty}
            onChange={setDifficulty}
            unit="INTENTOS"
          />

          <div className="w-full flex items-center justify-between border-b border-black dark:border-white py-6 px-2 font-mono">
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-widest">Formato</span>
              <span className="text-[10px] opacity-40 uppercase font-black">estructura de fecha</span>
            </div>
            <div className="text-sm font-black uppercase tracking-widest">
              DD - MM - AAAA
            </div>
          </div>
        </div>
      </ConfigLayout>
    )
  }

  return (
    <GameLayout title="ChronoGuessr" onReset={resetGame} onSettings={goToSetup}>
      <div className="flex-1 overflow-auto w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-10 py-8 animate-in fade-in duration-700">
        
        <div className="relative group flex flex-col items-center shrink-0">
          <BoardChrono 
            guesses={guesses} 
            currentGuess={currentGuess} 
            maxAttempts={maxAttempts}
          />
        </div>

        {gameState === 'gameOver' && (
          <GameOverModal 
            isWinner={isWinner}
            solution={`${solution.slice(0,2)}-${solution.slice(2,4)}-${solution.slice(4)}`}
            onRestart={resetGame}
            onSettings={goToSetup}
          />
        )}

        <div className="flex flex-col items-center gap-6 w-full shrink-0">
          <NumericKeyboard usedNumbers={usedNumbers} />

          <div className="flex flex-col items-center gap-2 min-h-[50px]">
            {error && (
              <div className="flex items-center gap-2 px-6 py-2 border-2 border-black dark:border-white text-black dark:text-white font-black uppercase tracking-tighter animate-pulse">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {gameState === 'playing' && !error && (
              <div className="max-w-md text-center space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Instrucciones</p>
                <p className="text-xs font-bold uppercase tracking-tighter">Introduce 8 números y pulsa [ENTER]</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GameLayout>
  )
}

const Chrono = () => {
  return (
    <ChronoProvider>
      <ChronoContent />
    </ChronoProvider>
  )
}

export default Chrono
