const DifficultySelector = ({ levels, currentLevel, onChange, unit = "FILAS" }) => {
  return (
    <div className="w-full flex items-center justify-between border-b border-black dark:border-white py-4 px-2 font-mono">
      <div className="flex flex-col">
        <span className="text-sm font-bold uppercase tracking-widest">Dificultad</span>
        <span className="text-[10px] opacity-40 uppercase font-black">intentos totales</span>
      </div>
      <div className="flex gap-2">
        {levels.map(level => (
          <button
            key={level.id}
            onClick={() => onChange(level.id)}
            className={`
              flex-1 h-12 border flex items-center justify-center gap-3 transition-all px-6
              ${currentLevel === level.id 
                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' 
                : 'border-gray-300 dark:border-gray-700 text-gray-400 hover:border-black dark:hover:border-white'}
            `}
          >
            <span className="text-xs font-black uppercase whitespace-nowrap">{level.name}</span>
            <span className="text-[10px] opacity-60 font-black whitespace-nowrap">{level.rows} {unit}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector
