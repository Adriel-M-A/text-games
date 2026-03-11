import { useEffect, useState, useCallback, useMemo } from 'react'
import GameLayout from '../../../layouts/GameLayout'
import ConfigLayout from '../../../layouts/ConfigLayout'
import BoardWordle from '../../../components/games/Wordle/BoardWordle'
import useWordle from '../../../hooks/useWordle'
import { WORDS_ES } from '../../../data/words_es'
import { AlertCircle } from 'lucide-react'
import LengthSelector from '../../../components/games/Wordle/LengthSelector'

const WordlePage = () => {
  const [gameState, setGameState] = useState('setup') // 'setup' | 'playing'
  const [wordLength, setWordLength] = useState(5)
  const [solution, setSolution] = useState('')

  const dictionary = useMemo(() => WORDS_ES[wordLength] || [], [wordLength])

  const { 
    currentGuess, 
    guesses, 
    isGameOver, 
    isWinner, 
    error, 
    handleKeyUp, 
    resetGame 
  } = useWordle(solution, wordLength, dictionary)

  const startGame = useCallback(() => {
    const words = WORDS_ES[wordLength]
    const newSolution = words[Math.floor(Math.random() * words.length)]
    setSolution(newSolution)
    setGameState('playing')
  }, [wordLength])

  const onReset = useCallback(() => {
    if (gameState === 'setup') return
    const words = WORDS_ES[wordLength]
    const newSolution = words[Math.floor(Math.random() * words.length)]
    setSolution(newSolution)
    resetGame()
  }, [wordLength, gameState, resetGame])

  const goToSetup = () => {
    setGameState('setup')
    resetGame()
  }

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
        <div className="space-y-12 py-10">
          <div className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest border-l-4 border-black dark:border-white pl-4">Ajustes</h2>
            <p className="text-xs font-bold uppercase opacity-50">Configurar parámetros de partida</p>
          </div>

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
    <GameLayout title="Wordle" onReset={onReset}>
      <div className="flex flex-col items-center space-y-8 animate-in fade-in duration-700">
        <div className="relative group">
          <BoardWordle 
            guesses={guesses} 
            currentGuess={currentGuess} 
            length={wordLength}
          />
          
          {isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[1px] animate-in zoom-in duration-300">
              <div className="bg-white dark:bg-black p-8 border border-black dark:border-white text-center scale-110 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">
                  {isWinner ? '¡LOGRADO!' : 'FALLASTE'}
                </h2>
                <p className="text-sm font-bold mb-6 border-b border-black dark:border-white pb-2">
                  {isWinner ? 'PRECISIÓN ABSOLUTA' : `LA PALABRA ERA: ${solution.toUpperCase()}`}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={onReset}
                    className="flex-1 px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-black uppercase transition-all active:scale-95"
                  >
                    REINTENTAR
                  </button>
                  <button 
                    onClick={goToSetup}
                    className="px-6 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-black uppercase transition-all active:scale-95 border border-transparent hover:border-black dark:hover:border-white"
                  >
                    AJUSTES
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 px-6 py-2 border-2 border-black dark:border-white text-black dark:text-white font-black uppercase tracking-tighter animate-pulse">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {!isGameOver && (
          <div className="max-w-md text-center space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Guía de Uso</p>
            <p className="text-xs font-bold uppercase tracking-tighter">Escribe y pulsa [ENTER] para validar</p>
          </div>
        )}
      </div>
    </GameLayout>
  )
}

export default WordlePage
