import { useState, useCallback } from 'react'

const useWordle = (solution, length = 5, dictionary = []) => {
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const [error, setError] = useState(null)

  const formatGuess = useCallback(() => {
    let solutionArray = [...solution.toUpperCase()]
    let guessArray = [...currentGuess.toUpperCase()]
    let result = Array(length).fill('absent')

    guessArray.forEach((letter, i) => {
      if (solutionArray[i] === letter) {
        result[i] = 'correct'
        solutionArray[i] = null
      }
    })

    guessArray.forEach((letter, i) => {
      if (result[i] !== 'correct' && solutionArray.includes(letter)) {
        result[i] = 'present'
        solutionArray[solutionArray.indexOf(letter)] = null
      }
    })

    return result
  }, [currentGuess, solution, length])

  const submitGuess = useCallback((result) => {
    const newGuess = { word: currentGuess, result }
    const updatedGuesses = [...guesses, newGuess]
    setGuesses(updatedGuesses)
    setCurrentGuess('')

    if (currentGuess.toUpperCase() === solution.toUpperCase()) {
      setIsWinner(true)
      setIsGameOver(true)
    } else if (updatedGuesses.length >= 6) {
      setIsGameOver(true)
    }
  }, [currentGuess, guesses, solution])

  const handleKeyUp = useCallback(({ key }) => {
    if (isGameOver) return
    setError(null)

    if (key === 'Enter') {
      if (currentGuess.length !== length) return
      
      // Validar si es una palabra válida si hay diccionario
      if (dictionary.length > 0 && !dictionary.includes(currentGuess.toLowerCase())) {
        setError('La palabra no existe')
        return
      }

      const result = formatGuess()
      submitGuess(result)
    }

    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < length) {
        setCurrentGuess(prev => (prev + key).toUpperCase())
      }
    }
  }, [currentGuess, isGameOver, length, dictionary, formatGuess, submitGuess])

  const resetGame = useCallback(() => {
    setCurrentGuess('')
    setGuesses([])
    setIsGameOver(false)
    setIsWinner(false)
    setError(null)
  }, [])

  return { currentGuess, guesses, isGameOver, isWinner, error, handleKeyUp, resetGame }
}

export default useWordle
