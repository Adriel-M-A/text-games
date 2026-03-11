import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { WORDS_ES } from '../data/words_es';

const WordleContext = createContext();

export const WordleProvider = ({ children }) => {
  const [gameState, setGameState] = useState('setup'); // 'setup' | 'playing' | 'gameOver'
  const [wordLength, setWordLength] = useState(5);
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

  const dictionary = useMemo(() => WORDS_ES[wordLength] || [], [wordLength]);
  
  const maxAttempts = useMemo(() => {
    return difficulties.find(d => d.id === difficulty)?.rows || 6;
  }, [difficulty]);

  const startGame = useCallback(() => {
    const words = WORDS_ES[wordLength];
    const newSolution = words[Math.floor(Math.random() * words.length)];
    setSolution(newSolution);
    setGuesses([]);
    setCurrentGuess('');
    setIsWinner(false);
    setGameState('playing');
    setError(null);
  }, [wordLength]);

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

  const formatGuess = useCallback(() => {
    let solutionArray = [...solution.toUpperCase()];
    let guessArray = [...currentGuess.toUpperCase()];
    let result = Array(wordLength).fill('absent');

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
  }, [currentGuess, solution, wordLength]);

  const submitGuess = useCallback((result) => {
    const newGuess = { word: currentGuess, result };
    const updatedGuesses = [...guesses, newGuess];
    setGuesses(updatedGuesses);
    setCurrentGuess('');

    if (currentGuess.toUpperCase() === solution.toUpperCase()) {
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
      if (currentGuess.length !== wordLength) return;
      
      if (dictionary.length > 0 && !dictionary.includes(currentGuess.toLowerCase())) {
        setError('La palabra no existe');
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

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess(prev => (prev + key).toUpperCase());
      }
    }
  }, [currentGuess, gameState, wordLength, dictionary, formatGuess, submitGuess]);

  const usedLetters = useMemo(() => {
    const letters = {};
    guesses.forEach(guess => {
      guess.word.toUpperCase().split('').forEach((letter, i) => {
        const status = guess.result[i];
        if (status === 'correct' || status === 'present') {
          letters[letter] = 'correct';
        } else if (status === 'absent' && letters[letter] !== 'correct') {
          letters[letter] = 'absent';
        }
      });
    });
    return letters;
  }, [guesses]);

  const value = {
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
  };

  return (
    <WordleContext.Provider value={value}>
      {children}
    </WordleContext.Provider>
  );
};

export const useWordleContext = () => {
  const context = useContext(WordleContext);
  if (!context) {
    throw new Error('useWordleContext must be used within a WordleProvider');
  }
  return context;
};
