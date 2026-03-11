import { useEffect } from 'react'
import GameLayout from '../layouts/GameLayout'
import ConfigLayout from '../layouts/ConfigLayout'
import BoardWordle from '../components/games/Wordle/BoardWordle'
import { AlertCircle } from 'lucide-react'
import LengthSelector from '../components/games/Wordle/LengthSelector'
import VisualKeyboard from '../components/games/Wordle/VisualKeyboard'
import DifficultySelector from '../components/games/Wordle/DifficultySelector'
import GameOverModal from '../components/common/GameOverModal'
import { WordleProvider, useWordleContext } from '../context/WordleContext'

const WordleContent = () => {
  const {
    gameState,
    wordLength,
    difficulty,
    solution,
    currentGuess,
    guesses,
    isWinner,
    error,
    difficulties,
    maxAttempts,
    setWordLength,
    setDifficulty,
    startGame,
    resetGame,
    goToSetup,
    handleKeyUp,
    usedLetters
  } = useWordleContext()

  useEffect(() => {
    if (gameState !== 'playing') return
    const listener = (e) => handleKeyUp({ key: e.key })
    window.addEventListener('keyup', listener)
    return () => window.removeEventListener('keyup', listener)
  }, [handleKeyUp, gameState])

  if (gameState === 'setup') {
    return (
      <ConfigLayout 
        title="Wordle" 
        onStart={startGame}
        startLabel="EMPEZAR"
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
          />

          <LengthSelector 
            lengths={[3, 4, 5, 6, 7, 8]}
            currentLength={wordLength}
            onChange={setWordLength}
          />
        </div>
      </ConfigLayout>
    )
  }

  return (
    <GameLayout title="Wordle" onReset={resetGame} onSettings={goToSetup}>
      <div className="flex-1 overflow-auto w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-10 py-8 animate-in fade-in duration-700">
        <div className="relative group flex flex-col items-center">
          <BoardWordle 
            guesses={guesses} 
            currentGuess={currentGuess} 
            length={wordLength}
            maxAttempts={maxAttempts}
          />
        </div>

        {gameState === 'gameOver' && (
          <GameOverModal 
            isWinner={isWinner}
            solution={solution}
            onRestart={resetGame}
            onSettings={goToSetup}
          />
        )}

        <div className="flex flex-col items-center gap-6 w-full">
          <VisualKeyboard usedLetters={usedLetters} />

          <div className="flex flex-col items-center gap-2 min-h-[50px]">
            {error && (
              <div className="flex items-center gap-2 px-6 py-2 border-2 border-black dark:border-white text-black dark:text-white font-black uppercase tracking-tighter animate-pulse">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {gameState === 'playing' && !error && (
              <div className="max-w-md text-center space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Guía de Uso</p>
                <p className="text-xs font-bold uppercase tracking-tighter">Escribe y pulsa [ENTER] para validar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GameLayout>
  )
}

const Wordle = () => {
  return (
    <WordleProvider>
      <WordleContent />
    </WordleProvider>
  )
}

export default Wordle
