import { Link, useNavigate } from 'react-router-dom'
import { Home, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import IconButton from '../ui/IconButton'

const GameHeader = ({ title, showBack = true, actionButton }) => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col border-b border-black dark:border-white shrink-0 font-mono text-black dark:text-white">
      {/* Barra de Navegación Superior */}
      <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-black transition-colors">
        <Link to="/" className="flex items-center gap-2 hover:line-through transition-all group">
          <span className="font-bold text-xl tracking-tight uppercase">TEXT_GAMES</span>
        </Link>
        
        <IconButton 
          icon={isDark ? Sun : Moon}
          onClick={toggleTheme}
          title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        />
      </header>

      {/* Barra de Título del Juego */}
      <div className="px-6 py-6 border-t border-black dark:border-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {showBack && (
              <>
                <IconButton 
                  icon={Home}
                  onClick={() => navigate('/')}
                  title="Inicio"
                />
                <div className="h-8 w-px bg-black dark:bg-white mx-1 opacity-20" />
              </>
            )}
            <h1 className="text-3xl font-black tracking-tighter uppercase">[{title}]</h1>
          </div>

          {actionButton && (
            <div className="flex items-center">
              {actionButton}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameHeader
