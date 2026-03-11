import React from 'react'

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

const VisualKeyboard = ({ usedLetters = {} }) => {
  return (
    <div className="flex flex-col items-center gap-1.5 select-none opacity-80">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5 w-full">
          {row.map(key => {
            const status = usedLetters[key]
            
            let bgStyle = 'border-black/5 dark:border-white/5 opacity-40'
            let textStyle = 'text-black/30 dark:text-white/30'
            
            if (status === 'correct') {
              bgStyle = 'bg-green-600 dark:bg-green-500 border-green-700 dark:border-green-400 opacity-100 scale-105'
              textStyle = 'text-white dark:text-black font-black'
            } else if (!status) {
              bgStyle = 'border-black/20 dark:border-white/20'
              textStyle = 'text-black dark:text-white'
            } else if (status === 'absent') {
              bgStyle = 'opacity-5 border-transparent'
              textStyle = 'text-transparent' // Casi invisible
            }

            return (
              <div
                key={key}
                className={`
                  w-8 h-10 sm:w-10 sm:h-12 border flex items-center justify-center 
                  text-sm sm:text-base font-bold uppercase transition-all duration-300
                  ${bgStyle} ${textStyle}
                `}
              >
                {key}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default VisualKeyboard
