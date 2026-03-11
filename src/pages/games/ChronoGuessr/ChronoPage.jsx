import { useEffect, useState, useCallback, useMemo } from 'react'
import GameLayout from '../../../layouts/GameLayout'
import ConfigLayout from '../../../layouts/ConfigLayout'
import BoardChrono from '../../../components/games/ChronoGuessr/BoardChrono'
import useChronoGuessr from '../../../hooks/useChronoGuessr'
import NumericKeyboard from '../../../components/games/ChronoGuessr/NumericKeyboard'
import DifficultySelector from '../../../components/games/Wordle/DifficultySelector'
import { AlertCircle } from 'lucide-react'

const ChronoPage = () => {
  const [gameState, setGameState] = useState('setup') // 'setup' | 'playing'
  const [difficulty, setDifficulty] = useState('normal')
  const [solution, setSolution] = useState('')

  const difficulties = [
    { id: 'easy', name: 'Fácil', rows: 8 },
    { id: 'normal', name: 'Normal', rows: 6 },
    { id: 'hard', name: 'Difícil', rows: 4 }
  ]

  const maxAttempts = useMemo(() => {
    return difficulties.find(d => d.id === difficulty)?.rows || 6
  }, [difficulty])

  // Generar fecha aleatoria entre 1950 y 2025
  const generateRandomDate = useCallback(() => {
    const start = new Date(1950, 0, 1)
    const end = new Date(2025, 11, 31)
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    
    const d = String(randomDate.getDate()).padStart(2, '0')
    const m = String(randomDate.getMonth() + 1).padStart(2, '0')
    const a = String(randomDate.getFullYear())
    
    return `${d}${m}${a}`
  }, [])

  const { 
    currentGuess, 
    guesses, 
    isGameOver, 
    isWinner, 
    error, 
    handleKeyUp, 
    resetGame,
    usedNumbers
  } = useChronoGuessr(solution, maxAttempts)

  const startGame = useCallback(() => {
    setSolution(generateRandomDate())
    setGameState('playing')
  }, [generateRandomDate])

  const onReset = useCallback(() => {
    if (gameState === 'setup') return
    const newSolution = generateRandomDate()
    setSolution(newSolution)
    resetGame(newSolution)
  }, [gameState, generateRandomDate, resetGame])

  const goToSetup = () => {
    setGameState('setup')
    resetGame('')
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
        title="ChronoGuessr" 
        onStart={startGame}
        startLabel="INICIAR PARTIDA"
      >
        <div className="flex flex-col gap-8">
          {/* Fila 1: Encabezado de Ajustes */}
          <div className="pt-8 pb-10 px-2 space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-widest">
              AJUSTES_DE_PARTIDA
            </h2>
            <p className="text-xs font-bold uppercase opacity-40">Personaliza tu experiencia de juego</p>
          </div>

          {/* Fila 2: Dificultad */}
          <DifficultySelector 
            levels={difficulties}
            currentLevel={difficulty}
            onChange={setDifficulty}
            unit="INTENTOS"
          />

          {/* Fila 3: Información de Formato */}
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
    <GameLayout title="ChronoGuessr" onReset={onReset} onSettings={goToSetup}>
      <div className="flex-1 overflow-auto w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-10 py-8 animate-in fade-in duration-700">
        
        {/* Tablero */}
        <div className="relative group flex flex-col items-center shrink-0">
          <BoardChrono 
            guesses={guesses} 
            currentGuess={currentGuess} 
            maxAttempts={maxAttempts}
          />
          
          {isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-[1px] animate-in zoom-in duration-300 z-10">
              <div className="bg-white dark:bg-black p-8 border border-black dark:border-white text-center scale-110 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">
                  {isWinner ? '¡CRONOLOGÍA OK!' : 'TIEMPO AGOTADO'}
                </h2>
                <p className="text-sm font-bold mb-6 border-b border-black dark:border-white pb-2">
                  {isWinner ? 'HISTORIADOR EXPERTO' : `LA FECHA ERA: ${solution.slice(0,2)}-${solution.slice(2,4)}-${solution.slice(4)}`}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={onReset}
                    className="flex-1 px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-black uppercase transition-all active:scale-95"
                  >
                    OTRA FECHA
                  </button>
                  <button 
                    onClick={goToSetup}
                    className="px-6 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-black uppercase transition-all active:scale-95 border border-transparent hover:border-black dark:hover:border-white"
                  >
                    INICIO
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Teclado y Mensajes */}
        <div className="flex flex-col items-center gap-6 w-full shrink-0">
          <NumericKeyboard usedNumbers={usedNumbers} />

          <div className="flex flex-col items-center gap-2 min-h-[50px]">
            {error && (
              <div className="flex items-center gap-2 px-6 py-2 border-2 border-black dark:border-white text-black dark:text-white font-black uppercase tracking-tighter animate-pulse">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {!isGameOver && !error && (
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

export default ChronoPage
