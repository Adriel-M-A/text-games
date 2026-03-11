import { Link } from 'react-router-dom'
import { ArrowLeft, Sun, Moon } from 'lucide-react'

const GameHeader = ({ title, showBack = true, actionButton }) => {
  return (
    <div className="flex flex-col border-b border-gray-200 dark:border-gray-800 shrink-0">
      {/* Barra de Navegación Superior */}
      <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900 transition-colors">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="font-bold text-xl uppercase tracking-widest text-blue-600 dark:text-blue-400">TextGames</span>
        </Link>
        
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
          <Sun className="hidden dark:block w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
          <Moon className="block dark:hidden w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
        </button>
      </header>

      {/* Barra de Título del Juego */}
      <div className="bg-gray-50 dark:bg-gray-800/40 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBack && (
              <>
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ArrowLeft size={18} />
                  <span>Volver</span>
                </Link>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
              </>
            )}
            <h1 className="text-xl font-black tracking-tight text-gray-800 dark:text-gray-200 uppercase">{title}</h1>
          </div>

          {actionButton && (
            <div>{actionButton}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameHeader
