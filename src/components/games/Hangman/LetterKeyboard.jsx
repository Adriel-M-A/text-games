const ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')

const LetterKeyboard = ({ guessedLetters, word, onGuess, disabled = false }) => {
  const wordInUpper = word.toUpperCase()

  return (
    <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 w-full max-w-2xl px-2">
      {ALPHABET.map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && wordInUpper.includes(letter)
        const isIncorrect = isGuessed && !wordInUpper.includes(letter)

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={isGuessed || disabled}
            className={`
              h-10 sm:h-12 border-2 flex items-center justify-center
              text-sm sm:text-base font-black uppercase
              transition-all duration-150 active:scale-95
              ${isCorrect ? 'bg-green-600 dark:bg-green-500 border-green-700 dark:border-green-400 text-white dark:text-black mt-0' : ''}
              ${isIncorrect ? 'bg-gray-200 dark:bg-gray-800 border-transparent text-gray-400 dark:text-gray-600 grayscale' : ''}
              ${!isGuessed ? 'border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black' : ''}
            `}
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}

export default LetterKeyboard
