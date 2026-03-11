import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ChronoContext = createContext();

export const ChronoProvider = ({ children }) => {
  const [gameState, setGameState] = useState('setup'); // 'setup' | 'playing' | 'gameOver'
  const [difficulty, setDifficulty] = useState('normal');
  const [solution, setSolution] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [error, setError] = useState(null);

  const difficulties = [
    { id: 'easy', name: 'Fácil', rows: 8 },
    { id: 'normal', name: 'Normal', rows: 6 },
    { id: 'hard', name: 'Difícil', rows: 4 }
  ];

  const maxAttempts = useMemo(() => {
    return difficulties.find(d => d.id === difficulty)?.rows || 6;
  }, [difficulty]);

  const generateRandomDate = useCallback(() => {
    const start = new Date(1950, 0, 1);
    const end = new Date(2025, 11, 31);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    const d = String(randomDate.getDate()).padStart(2, '0');
    const m = String(randomDate.getMonth() + 1).padStart(2, '0');
    const a = String(randomDate.getFullYear());
    
    return `${d}${m}${a}`;
  }, []);

  const startGame = useCallback(() => {
    const newSolution = generateRandomDate();
    setSolution(newSolution);
    setGuesses([]);
    setCurrentGuess('');
    setIsWinner(false);
    setGameState('playing');
    setError(null);
  }, [generateRandomDate]);

  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  const goToSetup = useCallback(() => {
    setGameState('setup');
    setGuesses([]);
    setCurrentGuess('');
    setIsWinner(false);
    setError(null);
  }, []);

  const isValidDate = useCallback((dateStr) => {
    if (dateStr.length !== 8) return false;
    const d = parseInt(dateStr.slice(0, 2));
    const m = parseInt(dateStr.slice(2, 4));
    const a = parseInt(dateStr.slice(4, 8));

    const date = new Date(a, m - 1, d);
    return (
      date.getFullYear() === a &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  }, []);

  const formatGuess = useCallback(() => {
    let solutionArray = [...solution];
    let guessArray = [...currentGuess];
    let result = Array(8).fill('absent');

    guessArray.forEach((letter, i) => {
      if (solutionArray[i] === letter) {
        result[i] = 'correct';
        solutionArray[i] = null;
      }
    });

    guessArray.forEach((letter, i) => {
      if (result[i] !== 'correct' && solutionArray.includes(letter)) {
        result[i] = 'present';
        solutionArray[solutionArray.indexOf(letter)] = null;
      }
    });

    return result;
  }, [currentGuess, solution]);

  const submitGuess = useCallback((result) => {
    const newGuess = { word: currentGuess, result };
    const updatedGuesses = [...guesses, newGuess];
    setGuesses(updatedGuesses);
    setCurrentGuess('');

    if (currentGuess === solution) {
      setIsWinner(true);
      setGameState('gameOver');
    } else if (updatedGuesses.length >= maxAttempts) {
      setGameState('gameOver');
    }
  }, [currentGuess, guesses, solution, maxAttempts]);

  const handleKeyUp = useCallback(({ key }) => {
    if (gameState !== 'playing') return;
    setError(null);

    if (key === 'Enter') {
      if (currentGuess.length !== 8) return;
      if (!isValidDate(currentGuess)) {
        setError('Fecha no válida');
        return;
      }

      const result = formatGuess();
      submitGuess(result);
      return;
    }

    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (/^[0-9]$/.test(key)) {
      if (currentGuess.length < 8) {
        setCurrentGuess(prev => prev + key);
      }
    }
  }, [currentGuess, gameState, isValidDate, formatGuess, submitGuess]);

  const usedNumbers = useMemo(() => {
    const numbers = {};
    guesses.forEach(guess => {
      guess.word.split('').forEach((num, i) => {
        const status = guess.result[i];
        if (status === 'correct' || status === 'present') {
          numbers[num] = 'correct';
        } else if (status === 'absent' && numbers[num] !== 'correct') {
          numbers[num] = 'absent';
        }
      });
    });
    return numbers;
  }, [guesses]);

  const value = {
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
  };

  return (
    <ChronoContext.Provider value={value}>
      {children}
    </ChronoContext.Provider>
  );
};

export const useChronoContext = () => {
  const context = useContext(ChronoContext);
  if (!context) {
    throw new Error('useChronoContext must be used within a ChronoProvider');
  }
  return context;
};
