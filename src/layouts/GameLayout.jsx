import { RotateCcw } from 'lucide-react'
import GameHeader from '../components/layout/GameHeader'

const GameLayout = ({ children, title, onReset }) => {
  const ResetButton = (
    <button 
      onClick={onReset}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
    >
      <RotateCcw size={18} />
      <span className="hidden sm:inline">Reiniciar</span>
    </button>
  )

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden">
      <GameHeader title={title} actionButton={ResetButton} />

      <main className="flex-1 overflow-auto flex flex-col items-center py-8">
        {children}
      </main>

      <footer className="h-10 flex items-center justify-center border-t border-gray-100 dark:border-gray-800 text-[10px] uppercase tracking-widest text-gray-400 font-bold bg-white dark:bg-gray-900 shrink-0">
        {title} &bull; TextGames &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default GameLayout
