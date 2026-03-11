const WordDisplay = ({ word, guessedLetters, revealFullWord = false }) => {
  const letters = word.toUpperCase().split('')

  return (
    <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
      {letters.map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)
        const isSpace = letter === ' '

        return (
          <div
            key={index}
            className={`
              flex flex-col items-center justify-center
              ${isSpace ? 'w-4 sm:w-8 border-transparent' : 'w-8 h-10 sm:w-10 sm:h-12 border-b-4 border-black dark:border-white'}
              transition-all duration-300
            `}
          >
            <span
              className={`
                text-2xl sm:text-3xl font-black uppercase
                ${isGuessed || revealFullWord ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                ${!isGuessed && revealFullWord ? 'text-red-500 dark:text-red-400' : 'text-black dark:text-white'}
                transition-all duration-300
              `}
            >
              {!isSpace ? (isGuessed || revealFullWord ? letter : '') : ''}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default WordDisplay
