import React from 'react'

const NUMS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['DELETE', '0', 'ENTER']
]

const NumericKeyboard = ({ usedNumbers = {} }) => {
  return (
    <div className="flex flex-col items-center gap-1.5 select-none opacity-80 max-w-xs w-full">
      {NUMS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 w-full">
          {row.map(key => {
            const status = usedNumbers[key]
            
            let bgStyle = 'border-black/20 dark:border-white/20'
            let textStyle = 'text-black dark:text-white'
            let width = 'w-14 sm:w-16'
            
            if (key === 'ENTER' || key === 'DELETE') {
              width = 'flex-1'
            }

            if (status === 'correct') {
              bgStyle = 'bg-green-600 dark:bg-green-500 border-green-700 dark:border-green-400 opacity-100'
              textStyle = 'text-white dark:text-black font-black'
            } else if (status === 'absent') {
              bgStyle = 'opacity-20 border-transparent grayscale'
            }

            return (
              <div
                key={key}
                className={`
                  ${width} h-12 border flex items-center justify-center 
                  text-sm font-black uppercase transition-all duration-300
                  ${bgStyle} ${textStyle}
                `}
              >
                {key === 'DELETE' ? 'DEL' : key}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default NumericKeyboard
