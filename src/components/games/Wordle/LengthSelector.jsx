const LengthSelector = ({ lengths, currentLength, onChange }) => {
  return (
    <div className="w-full flex items-center justify-between border-b border-black dark:border-white py-4 px-2 font-mono">
      <span className="text-sm font-bold uppercase tracking-widest">Longitud de palabra</span>
      <div className="flex gap-2">
        {lengths.map(len => (
          <button
            key={len}
            onClick={() => onChange(len)}
            className={`
              w-10 h-10 border flex items-center justify-center text-sm font-bold transition-all
              ${currentLength === len 
                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' 
                : 'border-gray-300 dark:border-gray-700 text-gray-400 hover:border-black dark:hover:border-white'}
            `}
          >
            {len}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LengthSelector
