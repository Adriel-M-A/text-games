import GameHeader from '../components/layout/GameHeader'

const ConfigLayout = ({ children, title, onStart, startLabel = "EMPEZAR" }) => {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-hidden font-mono">
      <GameHeader title={title} />

      <main className="flex-1 overflow-auto flex flex-col items-center justify-center p-6 pb-24">
        <div className="w-full max-w-xl border border-black dark:border-white p-6">
          {children}
        </div>
      </main>

      <footer className="h-24 flex items-center justify-center px-6 border-t border-black dark:border-white bg-white dark:bg-black shrink-0">
        <button 
          onClick={onStart}
          className="px-12 py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-black text-2xl transition-all active:scale-95 uppercase tracking-widest"
        >
          {startLabel === "EMPEZAR" ? "INICIAR PARTIDA" : startLabel}
        </button>
      </footer>
    </div>
  )
}

export default ConfigLayout
