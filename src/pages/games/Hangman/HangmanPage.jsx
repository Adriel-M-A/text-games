import { useState, useCallback, useEffect } from 'react'
import GameLayout from '../../../layouts/GameLayout'
import ConfigLayout from '../../../layouts/ConfigLayout'
import useHangman from '../../../hooks/useHangman'
import HangmanDrawing from '../../../components/games/Hangman/HangmanDrawing'
import WordDisplay from '../../../components/games/Hangman/WordDisplay'
import LetterKeyboard from '../../../components/games/Hangman/LetterKeyboard'
import DifficultySelector from '../../../components/games/Wordle/DifficultySelector'
import { WORDS_ES } from '../../../data/words_es'
import { HANGMAN_DATA } from '../../../data/hangman_data'

const HangmanPage = () => {
  const [gameState, setGameState] = useState('setup')
  const [difficulty, setDifficulty] = useState('easy')
  const [solution, setSolution] = useState('')

  const difficulties = [
    { id: 'easy', name: 'Fácil', rows: 1 }, // 1 palabra
    { id: 'normal', name: 'Normal', rows: 2 }, // 2 palabras
    { id: 'hard', name: 'Difícil', rows: 3 } // 3 palabras
  ]

  const {
    guessedLetters,
    mistakes,
    isWinner,
    isGameOver,
    guessLetter,
    resetGame
  } = useHangman(solution)

  const generatePhrase = useCallback((level) => {
    const { articles, nouns, adjectives } = HANGMAN_DATA
    
    // Pick random items
    const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)]
    
    if (level === 'easy') {
      return getRand(nouns)
    }
    
    if (level === 'normal') {
      return `${getRand(nouns)} ${getRand(adjectives)}`
    }
    
    if (level === 'hard') {
      return `${getRand(articles)} ${getRand(nouns)} ${getRand(adjectives)}`
    }
    
    return getRand(nouns)
  }, [])

  const startGame = useCallback(() => {
    setSolution(generatePhrase(difficulty))
    setGameState('playing')
  }, [difficulty, generatePhrase])

  const onReset = useCallback(() => {
    const newSolution = generatePhrase(difficulty)
    setSolution(newSolution)
    resetGame()
  }, [difficulty, generatePhrase, resetGame])

  const goToSetup = () => {
    setGameState('setup')
    resetGame()
  }

  // Manejo de teclado físico
  useEffect(() => {
    if (gameState !== 'playing' || isGameOver) return
    
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase()
      if (/^[A-ZÑ]$/.test(key)) {
        guessLetter(key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState, isGameOver, guessLetter])

  if (gameState === 'setup') {
    return (
      <ConfigLayout 
        title="Hangman" 
        onStart={startGame}
        startLabel="INICIAR PARTIDA"
      >
        <div className="flex flex-col gap-8">
          {/* Fila 1: Encabezado de Ajustes */}
          <div className="pt-8 pb-10 px-2 space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-widest">
              AJUSTES_DE_PARTIDA
            </h2>
            <p className="text-xs font-bold uppercase opacity-40">Elige cuántas palabras adivinar</p>
          </div>

          {/* Fila 2: Dificultad */}
          <DifficultySelector 
            levels={difficulties.map(d => ({ ...d, rows: d.rows === 1 ? '1 PALABRA' : `${d.rows} PALABRAS` }))}
            currentLevel={difficulty}
            onChange={setDifficulty}
          />

          <div className="px-2">
            <div className="p-6 border-2 border-black dark:border-white text-center space-y-2">
              <h3 className="font-black uppercase tracking-tighter italic">Reglas Clásicas</h3>
              <p className="text-[10px] font-bold uppercase opacity-50">6 errores permitidos - El dibujo se completa parte a parte</p>
            </div>
          </div>
        </div>
      </ConfigLayout>
    )
  }

  return (
    <GameLayout title="Hangman" onReset={onReset} onSettings={goToSetup}>
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-between py-6 gap-8 animate-in fade-in duration-700 overflow-auto">
        
        {/* Parte Superior: Dibujo y Palabra */}
        <div className="flex flex-col items-center gap-10 w-full shrink-0">
          <HangmanDrawing numberOfMistakes={mistakes} />
          <WordDisplay 
            word={solution} 
            guessedLetters={guessedLetters} 
            revealFullWord={isGameOver && !isWinner}
          />
        </div>

        {/* Parte Inferior: Teclado */}
        <div className="flex flex-col items-center gap-6 w-full shrink-0 pb-4">
          <LetterKeyboard 
            word={solution}
            guessedLetters={guessedLetters} 
            onGuess={guessLetter}
            disabled={isGameOver}
          />
        </div>

        {/* Modales de resultado (Simplificado para el flujo) */}
        {isGameOver && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[1px] animate-in zoom-in duration-300 z-50 p-4">
            <div className="bg-white dark:bg-black p-8 border-4 border-black dark:border-white text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] max-w-sm w-full">
              <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">
                {isWinner ? '¡SALVADO!' : '¡AHORCADO!'}
              </h2>
              <p className="text-sm font-bold mb-6 border-b-2 border-black dark:border-white pb-2 uppercase italic">
                {isWinner ? 'Palabra descubierta' : `La palabra era: ${solution.toUpperCase()}`}
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={onReset}
                  className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-black uppercase transition-all active:scale-95"
                >
                  OTRA PALABRA
                </button>
                <button 
                  onClick={goToSetup}
                  className="w-full px-6 py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-black uppercase transition-all active:scale-95 border-2 border-black dark:border-white"
                >
                  VOLVER AL INICIO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </GameLayout>
  )
}

export default HangmanPage
