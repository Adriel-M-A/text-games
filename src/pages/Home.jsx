import { Link } from 'react-router-dom'
import GlobalHeader from '../components/layout/GlobalHeader'

const Home = () => {
  const games = [
    { id: 1, name: 'WORDLE', description: 'Adivina la palabra secreta de N letras', path: '/wordle' },
    { id: 2, name: 'CHRONO_GUESSR', description: 'Descubre la fecha secreta DD-MM-AAAA', path: '/chrono' },
    { id: 3, name: 'HANGMAN', description: 'El clásico juego del ahorcado', path: '/hangman' },
    { id: 4, name: 'SUDOKU', description: 'El clásico desafío matemático', disabled: true },
    { id: 5, name: 'CRUCIGRAMA', description: 'Completa las palabras cruzadas', disabled: true }
  ]

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-none font-mono overflow-hidden">
      <GlobalHeader />

      {/* Main */}
      <main className="flex-1 overflow-auto flex flex-col items-center py-12 px-6">
        <div className="text-center mb-16 space-y-2">
          <h1 className="text-6xl font-black tracking-tighter uppercase">
            TEXT_GAMES
          </h1>
          <p className="text-sm font-bold border-y border-black dark:border-white py-1 px-4 inline-block uppercase tracking-widest">
            letras_y_numeros
          </p>
        </div>

        {/* Lista de Juegos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          {games.map(game => (
            game.path && !game.disabled ? (
              <Link 
                key={game.id} 
                to={game.path}
                className="p-8 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group relative overflow-hidden"
              >
                <h3 className="text-2xl font-black mb-2 group-hover:line-through">{game.name}</h3>
                <p className="text-xs uppercase font-bold opacity-70">{game.description}</p>
                <div className="absolute right-4 bottom-4 text-xs font-black">{"->"}</div>
              </Link>
            ) : (
              <div 
                key={game.id} 
                className="p-8 border border-gray-200 dark:border-gray-800 opacity-40 grayscale flex flex-col justify-center"
              >
                <h3 className="text-2xl font-black mb-2">{game.name}</h3>
                <p className="text-xs uppercase font-bold">{game.description}</p>
                <span className="mt-4 text-[10px] uppercase font-black border border-gray-300 dark:border-gray-700 w-fit px-2">PRÓXIMAMENTE</span>
              </div>
            )
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 flex items-center justify-center border-t-2 border-black dark:border-white text-[10px] font-black uppercase tracking-widest shrink-0 bg-white dark:bg-black">
        &copy; {new Date().getFullYear()} TEXT_GAMES &bull; ANALOG_EDITION
      </footer>
    </div>
  )
}

export default Home
