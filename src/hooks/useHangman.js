import { useState, useCallback, useMemo } from 'react'

const useHangman = (word, maxMistakes = 6) => {
  const [guessedLetters, setGuessedLetters] = useState([])
  const [mistakes, setMistakes] = useState(0)

  const isWinner = useMemo(() => {
    if (!word) return false
    const charArray = word.toUpperCase().split('').filter(char => char !== ' ')
    return charArray.every(letter => guessedLetters.includes(letter))
  }, [word, guessedLetters])

  const isGameOver = useMemo(() => {
    return mistakes >= maxMistakes || isWinner
  }, [mistakes, maxMistakes, isWinner])

  const guessLetter = useCallback((letter) => {
    if (isGameOver) return
    
    const upperLetter = letter.toUpperCase()
    if (guessedLetters.includes(upperLetter)) return

    setGuessedLetters(prev => [...prev, upperLetter])

    if (!word.toUpperCase().includes(upperLetter)) {
      setMistakes(prev => prev + 1)
    }
  }, [word, guessedLetters, isGameOver])

  const resetGame = useCallback(() => {
    setGuessedLetters([])
    setMistakes(0)
  }, [])

  return {
    guessedLetters,
    mistakes,
    isWinner,
    isGameOver,
    guessLetter,
    resetGame
  }
}

export default useHangman
