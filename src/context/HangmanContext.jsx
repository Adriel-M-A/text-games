import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { HANGMAN_DATA } from '../data/hangman_data';

const HangmanContext = createContext();

export const useHangmanContext = () => {
  const context = useContext(HangmanContext);
  if (!context) {
    throw new Error('useHangmanContext debe usarse dentro de un HangmanProvider');
  }
  return context;
};

export const HangmanProvider = ({ children }) => {
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing'
  const [difficulty, setDifficulty] = useState('easy');
  const [solution, setSolution] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const maxMistakes = 6;

  const generatePhrase = useCallback((level) => {
    const { articles, nouns, adjectives } = HANGMAN_DATA;
    const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    if (level === 'easy') return getRand(nouns);
    if (level === 'normal') return `${getRand(nouns)} ${getRand(adjectives)}`;
    if (level === 'hard') return `${getRand(articles)} ${getRand(nouns)} ${getRand(adjectives)}`;
    return getRand(nouns);
  }, []);

  const startGame = useCallback((customWord = '') => {
    const wordToUse = customWord.trim() ? customWord : generatePhrase(difficulty);
    setSolution(wordToUse.toUpperCase());
    setGuessedLetters([]);
    setMistakes(0);
    setGameState('playing');
  }, [difficulty, generatePhrase]);

  const resetGame = useCallback(() => {
    const newSolution = generatePhrase(difficulty);
    setSolution(newSolution.toUpperCase());
    setGuessedLetters([]);
    setMistakes(0);
  }, [difficulty, generatePhrase]);

  const guessLetter = useCallback((letter) => {
    const upperLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperLetter)) return;

    setGuessedLetters((prev) => [...prev, upperLetter]);

    if (!solution.includes(upperLetter)) {
      setMistakes((prev) => prev + 1);
    }
  }, [guessedLetters, solution]);

  const isWinner = useMemo(() => {
    if (!solution) return false;
    const charArray = solution.split('').filter((char) => char !== ' ');
    return charArray.every((letter) => guessedLetters.includes(letter));
  }, [solution, guessedLetters]);

  const isGameOver = useMemo(() => {
    return mistakes >= maxMistakes || isWinner;
  }, [mistakes, isWinner]);

  const value = {
    gameState,
    setGameState,
    difficulty,
    setDifficulty,
    solution,
    setSolution,
    guessedLetters,
    mistakes,
    maxMistakes,
    startGame,
    resetGame,
    guessLetter,
    isWinner,
    isGameOver,
  };

  return (
    <HangmanContext.Provider value={value}>
      {children}
    </HangmanContext.Provider>
  );
};
