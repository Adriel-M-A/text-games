import { useEffect, useState, useCallback, useMemo } from 'react'
import GameLayout from '../../../layouts/GameLayout'
import ConfigLayout from '../../../layouts/ConfigLayout'
import BoardWordle from '../../../components/games/Wordle/BoardWordle'
import useWordle from '../../../hooks/useWordle'
import { WORDS_ES } from '../../../data/words_es'
import { Settings2, AlertCircle } from 'lucide-react'

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
        title="Configuración de Wordle" 
        onStart={startGame}
        startLabel="¡EMPEZAR JUEGO!"
      >
        <div className="text-center space-y-8 animate-in zoom-in duration-300">
          <div className="space-y-2">
            <Settings2 className="mx-auto w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-3xl font-black">Dificultad</h2>
            <p className="text-gray-500 dark:text-gray-400">Elige la longitud de la palabra secreta</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[3, 4, 5, 6, 7, 8].map(len => (
              <button
                key={len}
                onClick={() => setWordLength(len)}
                className={`
                  w-14 h-14 rounded-2xl font-black text-lg transition-all border-4
                  ${wordLength === len 
                    ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-xl shadow-blue-500/20' 
                    : 'border-gray-100 dark:border-gray-800 hover:border-blue-400 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800'}
                `}
              >
                {len}
              </button>
            ))}
          </div>
        </div>
      </ConfigLayout>
    )
  }

  return (
    <GameLayout title={`Wordle (${wordLength} letras)`} onReset={onReset}>
      <div className="flex flex-col items-center space-y-8 animate-in fade-in duration-700">
        <div className="relative group">
          <BoardWordle 
            guesses={guesses} 
            currentGuess={currentGuess} 
            length={wordLength}
          />
          
          {isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/10 dark:bg-black/10 backdrop-blur-[2px] rounded-3xl animate-in zoom-in duration-300">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 text-center scale-110">
                <h2 className={`text-3xl font-black mb-2 ${isWinner ? 'text-green-500' : 'text-red-500'}`}>
                  {isWinner ? '¡GANASTE!' : 'FIN DEL JUEGO'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">
                  {isWinner ? '¡Increíble deducción!' : `La palabra era: ${solution.toUpperCase()}`}
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={onReset}
                    className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all"
                  >
                    Reiniciar
                  </button>
                  <button 
                    onClick={goToSetup}
                    className="px-6 py-2 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 text-gray-500 rounded-full font-bold transition-all"
                  >
                    Ajustes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold animate-bounce">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {!isGameOver && (
          <div className="max-w-md text-center space-y-2 opacity-50">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Instrucciones</p>
            <p className="text-sm text-gray-500">Usa tu teclado para escribir y Enter para enviar.</p>
          </div>
        )}
      </div>
    </GameLayout>
  )
}

export default WordlePage
