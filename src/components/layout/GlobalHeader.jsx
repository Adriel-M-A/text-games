import { Link, useNavigate } from 'react-router-dom'
import { Home as HomeIcon, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import IconButton from '../ui/IconButton'

/**
 * GlobalHeader - Unifica la navegación de toda la aplicación.
 * Se adapta según si estamos en la Home o dentro de un juego.
 */
const GlobalHeader = ({ title, showBack = false, actionButton }) => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="h-16 border-b border-black dark:border-white bg-white dark:bg-black transition-colors shrink-0 font-mono text-black dark:text-white flex items-center">
      <div className="max-w-5xl mx-auto w-full px-6 flex items-center justify-between relative">
        {/* Lado Izquierdo: Logo o Botón Atrás */}
        <div className="flex items-center">
          {showBack ? (
            <IconButton 
              icon={HomeIcon}
              onClick={() => navigate('/')}
              title="Inicio"
            />
          ) : (
            <Link to="/" className="flex items-center gap-2 hover:line-through transition-all group">
              <span className="font-bold text-xl tracking-tight uppercase">TEXT_GAMES</span>
            </Link>
          )}
        </div>

        {/* Centro: Título del Juego (Absoluto) */}
        {showBack && title && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
            <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase whitespace-nowrap">
              [{title}]
            </h1>
          </div>
        )}

        {/* Lado Derecho: Acciones de Juego + Cambio de Tema */}
        <div className="flex items-center gap-2">
          {actionButton && (
            <div className="flex items-center">
              {actionButton}
            </div>
          )}
          <IconButton 
            icon={isDark ? Sun : Moon}
            onClick={toggleTheme}
            title={isDark ? "Modo Claro" : "Modo Oscuro"}
          />
        </div>
      </div>
    </header>
  )
}

export default GlobalHeader
