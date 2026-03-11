import { useState, useCallback, useMemo } from 'react'

const useChronoGuessr = (solution, maxAttempts = 6) => {
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const [error, setError] = useState(null)

  // Longitud fija de 8 dígitos para DDMMAAAA
  const length = 8

  const isValidDate = useCallback((dateStr) => {
    if (dateStr.length !== 8) return false
    const d = parseInt(dateStr.slice(0, 2))
    const m = parseInt(dateStr.slice(2, 4))
    const a = parseInt(dateStr.slice(4, 8))

    const date = new Date(a, m - 1, d)
    return (
      date.getFullYear() === a &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    )
  }, [])

  const formatGuess = useCallback(() => {
    let solutionArray = [...solution]
    let guessArray = [...currentGuess]
    let result = Array(length).fill('absent')

    // Primera pasada: correctos (verde)
    guessArray.forEach((letter, i) => {
      if (solutionArray[i] === letter) {
        result[i] = 'correct'
        solutionArray[i] = null
      }
    })

    // Segunda pasada: presentes (amarillo)
    guessArray.forEach((letter, i) => {
      if (result[i] !== 'correct' && solutionArray.includes(letter)) {
        result[i] = 'present'
        solutionArray[solutionArray.indexOf(letter)] = null
      }
    })

    return result
  }, [currentGuess, solution])

  const submitGuess = useCallback((result) => {
    const newGuess = { word: currentGuess, result }
    const updatedGuesses = [...guesses, newGuess]
    setGuesses(updatedGuesses)
    setCurrentGuess('')

    if (currentGuess === solution) {
      setIsWinner(true)
      setIsGameOver(true)
    } else if (updatedGuesses.length >= maxAttempts) {
      setIsGameOver(true)
    }
  }, [currentGuess, guesses, solution, maxAttempts])

  const handleKeyUp = useCallback(({ key }) => {
    if (isGameOver) return
    setError(null)

    if (key === 'Enter') {
      if (currentGuess.length !== length) return
      
      if (!isValidDate(currentGuess)) {
        setError('Fecha no válida')
        return
      }

      const result = formatGuess()
      submitGuess(result)
    }

    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

    if (/^[0-9]$/.test(key)) {
      if (currentGuess.length < length) {
        setCurrentGuess(prev => prev + key)
      }
    }
  }, [currentGuess, isGameOver, isValidDate, formatGuess, submitGuess])

  const resetGame = useCallback((newSolution) => {
    setCurrentGuess('')
    setGuesses([])
    setIsGameOver(false)
    setIsWinner(false)
    setError(null)
  }, [])

  const usedNumbers = useMemo(() => {
    const numbers = {}
    guesses.forEach(guess => {
      guess.word.split('').forEach((num, i) => {
        const status = guess.result[i]
        if (status === 'correct' || status === 'present') {
          numbers[num] = 'correct'
        } else if (status === 'absent' && numbers[num] !== 'correct') {
          numbers[num] = 'absent'
        }
      })
    })
    return numbers
  }, [guesses])

  return { currentGuess, guesses, isGameOver, isWinner, error, handleKeyUp, resetGame, usedNumbers }
}

export default useChronoGuessr
