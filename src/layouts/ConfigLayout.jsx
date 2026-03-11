import GameHeader from '../components/layout/GameHeader'

const ConfigLayout = ({ children, title, onStart, startLabel = "¡EMPEZAR JUEGO!" }) => {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden">
      <GameHeader title={title} />

      <main className="flex-1 overflow-auto flex flex-col items-center justify-center p-6 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>

      <footer className="h-24 flex items-center justify-center px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
        <button 
          onClick={onStart}
          className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3 animate-bounce-subtle"
        >
          {startLabel}
        </button>
      </footer>
    </div>
  )
}

export default ConfigLayout
