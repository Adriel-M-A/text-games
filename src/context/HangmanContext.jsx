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
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'gameOver'
  const [difficulty, setDifficulty] = useState('easy');
  const [solution, setSolution] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [customWord, setCustomWord] = useState('');
  const maxMistakes = 6;

  const difficulties = [
    { id: 'easy', name: 'Fácil', rows: '1 PALABRA' },
    { id: 'normal', name: 'Normal', rows: '2 PALABRAS' },
    { id: 'hard', name: 'Difícil', rows: '3 PALABRAS' },
  ];

  const generatePhrase = useCallback((level) => {
    const { articles, nouns, adjectives } = HANGMAN_DATA;
    const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    if (level === 'easy') return getRand(nouns);
    if (level === 'normal') return `${getRand(nouns)} ${getRand(adjectives)}`;
    if (level === 'hard') return `${getRand(articles)} ${getRand(nouns)} ${getRand(adjectives)}`;
    return getRand(nouns);
  }, []);

  const startGame = useCallback((manualWord = '') => {
    const wordToUse = manualWord.trim() ? manualWord : generatePhrase(difficulty);
    setSolution(wordToUse.toUpperCase());
    setGuessedLetters([]);
    setMistakes(0);
    setGameState('playing');
  }, [difficulty, generatePhrase]);

  const resetGame = useCallback(() => {
    startGame(customWord);
  }, [startGame, customWord]);

  const goToSetup = useCallback(() => {
    setGameState('setup');
    setGuessedLetters([]);
    setMistakes(0);
  }, []);

  const guessLetter = useCallback((letter) => {
    if (gameState !== 'playing') return;
    const upperLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperLetter)) return;

    const newGuessed = [...guessedLetters, upperLetter];
    setGuessedLetters(newGuessed);

    if (!solution.includes(upperLetter)) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= maxMistakes) {
        setGameState('gameOver');
      }
    } else {
      // Check win
      const charArray = solution.split('').filter((char) => char !== ' ');
      if (charArray.every((l) => newGuessed.includes(l))) {
        setGameState('gameOver');
      }
    }
  }, [guessedLetters, solution, mistakes, gameState]);

  const isWinner = useMemo(() => {
    if (!solution) return false;
    const charArray = solution.split('').filter((char) => char !== ' ');
    return charArray.every((letter) => guessedLetters.includes(letter));
  }, [solution, guessedLetters]);

  const value = {
    gameState,
    difficulty,
    setDifficulty,
    solution,
    guessedLetters,
    mistakes,
    maxMistakes,
    customWord,
    setCustomWord,
    difficulties,
    startGame,
    resetGame,
    goToSetup,
    guessLetter,
    isWinner,
  };

  return (
    <HangmanContext.Provider value={value}>
      {children}
    </HangmanContext.Provider>
  );
};
