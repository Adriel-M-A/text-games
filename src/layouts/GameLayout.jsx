import { RotateCcw } from 'lucide-react'
import GameHeader from '../components/layout/GameHeader'
import IconButton from '../components/ui/IconButton'

const GameLayout = ({ children, title, onReset }) => {
  const ResetButton = (
    <IconButton 
      icon={RotateCcw}
      onClick={onReset}
      title="Reiniciar Juego"
    />
  )

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-hidden font-mono">
      <GameHeader title={title} actionButton={ResetButton} />

      <main className="flex-1 overflow-auto flex flex-col items-center justify-center p-6 bg-white dark:bg-black">
        {children}
      </main>

      <footer className="h-10 flex items-center justify-center border-t border-black dark:border-white text-[10px] uppercase tracking-widest text-black dark:text-white font-bold bg-white dark:bg-black shrink-0 opacity-30">
        {title} &bull; TEXT_GAMES &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default GameLayout
