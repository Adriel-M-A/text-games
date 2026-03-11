import { useEffect } from 'react';
import GameLayout from '../layouts/GameLayout';
import ConfigLayout from '../layouts/ConfigLayout';
import { useHangmanContext, HangmanProvider } from '../context/HangmanContext';
import HangmanDrawing from '../components/games/Hangman/HangmanDrawing';
import WordDisplay from '../components/games/Hangman/WordDisplay';
import LetterKeyboard from '../components/games/Hangman/LetterKeyboard';
import DifficultySelector from '../components/games/Wordle/DifficultySelector';
import GameOverModal from '../components/common/GameOverModal';

const HangmanContent = () => {
  const {
    gameState,
    difficulty,
    solution,
    guessedLetters,
    mistakes,
    difficulties,
    setDifficulty,
    customWord,
    setCustomWord,
    startGame,
    resetGame,
    guessLetter,
    isWinner,
    goToSetup
  } = useHangmanContext();

  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (event) => {
      const char = event.key.toLowerCase();
      if (/^[a-zñ]$/.test(char)) {
        guessLetter(char);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, guessLetter]);

  if (gameState === 'setup') {
    return (
      <ConfigLayout title="Hangman" onStart={() => startGame(customWord)} startLabel="INICIAR PARTIDA">
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
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-start gap-10 py-10 px-4 overflow-auto animate-in fade-in duration-700">
        
        {/* Fila 1: El Muñeco (Más pequeño) */}
        <div className="relative w-full flex items-center justify-center shrink-0">
          <div className="w-48 h-60 flex items-center justify-center">
            <HangmanDrawing numberOfMistakes={mistakes} />
          </div>
        </div>

        {gameState === 'gameOver' && (
          <GameOverModal 
            isWinner={isWinner}
            solution={solution}
            onRestart={resetGame}
            onSettings={goToSetup}
          />
        )}

        {/* Fila 2: La Palabra */}
        <div className="w-full flex items-center justify-center py-4">
          <WordDisplay word={solution} guessedLetters={guessedLetters} />
        </div>

        {/* Fila 3: El Teclado */}
        <div className="w-full max-w-3xl flex items-center justify-center mt-auto pb-6">
          <LetterKeyboard
            guessedLetters={guessedLetters}
            word={solution}
            onGuess={guessLetter}
            disabled={gameState !== 'playing'}
          />
        </div>

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
