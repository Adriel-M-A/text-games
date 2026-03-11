import { useEffect, useState } from 'react';
import GameLayout from '../layouts/GameLayout';
import ConfigLayout from '../layouts/ConfigLayout';
import { useHangmanContext, HangmanProvider } from '../context/HangmanContext';
import HangmanDrawing from '../components/games/Hangman/HangmanDrawing';
import WordDisplay from '../components/games/Hangman/WordDisplay';
import LetterKeyboard from '../components/games/Hangman/LetterKeyboard';
import DifficultySelector from '../components/games/Wordle/DifficultySelector';

const HangmanContent = () => {
  const {
    gameState,
    setGameState,
    difficulty,
    setDifficulty,
    solution,
    guessedLetters,
    mistakes,
    startGame,
    resetGame,
    guessLetter,
    isWinner,
    isGameOver,
  } = useHangmanContext();

  const [customWord, setCustomWord] = useState('');

  const difficulties = [
    { id: 'easy', name: 'Fácil', rows: '1 PALABRA' },
    { id: 'normal', name: 'Normal', rows: '2 PALABRAS' },
    { id: 'hard', name: 'Difícil', rows: '3 PALABRAS' },
  ];

  const handleStart = () => {
    startGame(customWord);
  };

  const goToSetup = () => {
    setGameState('setup');
    setCustomWord('');
  };

  useEffect(() => {
    if (gameState !== 'playing' || isGameOver) return;

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (/^[A-ZÑ]$/.test(key)) {
        guessLetter(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isGameOver, guessLetter]);

  if (gameState === 'setup') {
    return (
      <ConfigLayout title="Hangman" onStart={handleStart} startLabel="INICIAR PARTIDA">
        <div className="flex flex-col gap-8">
          <div className="pt-8 pb-10 px-2 space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-widest">AJUSTES_DE_PARTIDA</h2>
            <p className="text-xs font-bold uppercase opacity-40">Personaliza tu experiencia de juego</p>
          </div>

          {/* Fila 2: Dificultad */}
          <DifficultySelector
            levels={difficulties}
            currentLevel={difficulty}
            onChange={setDifficulty}
            unit=""
          />

          {/* Fila 3: Palabra Personalizada */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-b border-black dark:border-white py-6 px-2 font-mono gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-widest">Modo_Manual</span>
              <span className="text-[10px] opacity-40 uppercase font-black">Escribe tu propia palabra</span>
            </div>
            <div className="flex-1 max-w-sm w-full">
              <input
                id="custom-word"
                type="text"
                value={customWord}
                onChange={(e) => setCustomWord(e.target.value)}
                placeholder="ESCRIBE AQUÍ..."
                className="w-full bg-transparent border-b-2 border-black/20 dark:border-white/20 p-2 text-sm font-black uppercase outline-none focus:border-black dark:focus:border-white transition-colors"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="px-2 pt-4">
             <p className="text-[10px] font-bold uppercase opacity-30 text-center tracking-widest">
               Si escribes algo manual, se ignorará el nivel elegido arriba
             </p>
          </div>
        </div>
      </ConfigLayout>
    );
  }

  return (
    <GameLayout title="Hangman" onReset={resetGame} onSettings={goToSetup}>
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-between py-6 gap-8 animate-in fade-in duration-700 overflow-auto">
        <div className="flex flex-col items-center gap-10 w-full shrink-0">
          <HangmanDrawing numberOfMistakes={mistakes} />
          <WordDisplay
            word={solution}
            guessedLetters={guessedLetters}
            revealFullWord={isGameOver && !isWinner}
          />
        </div>

        <div className="flex flex-col items-center gap-6 w-full shrink-0 pb-4">
          <LetterKeyboard
            word={solution}
            guessedLetters={guessedLetters}
            onGuess={guessLetter}
            disabled={isGameOver}
          />
        </div>

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
                  onClick={resetGame}
                  className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-black uppercase transition-all active:scale-95"
                >
                  OTRA PARTIDA
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
  );
};

const Hangman = () => {
  return (
    <HangmanProvider>
      <HangmanContent />
    </HangmanProvider>
  );
};

export default Hangman;
