const Cell = ({ letter = '', status = 'empty' }) => {
  const statusStyles = {
    empty: 'border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white',
    correct: 'bg-green-500 border-green-500 text-white',
    present: 'bg-yellow-500 border-yellow-500 text-white',
    absent: 'bg-gray-500 border-gray-500 text-white',
    active: 'border-blue-500 dark:border-blue-400 text-gray-900 dark:text-white scale-105'
  }

  return (
    <div 
      className={`
        w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center 
        text-2xl sm:text-3xl font-black uppercase transition-all duration-300
        ${statusStyles[status]}
      `}
    >
      {letter}
    </div>
  )
}

export default Cell
