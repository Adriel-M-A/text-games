import { Sun, Moon, Gamepad2 } from 'lucide-react'

const Home = () => {
  // Simulación de una lista de juegos
  const games = [
    { id: 1, name: 'Ahorcado', description: 'Adivina la palabra antes de que sea tarde' },
    { id: 2, name: 'Sopa de Letras', description: 'Encuentra las palabras ocultas' },
    { id: 3, name: 'Sudoku', description: 'El clásico desafío matemático' },
    { id: 4, name: 'Crucigrama', description: 'Completa las palabras cruzadas' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Gamepad2 className="text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-xl uppercase tracking-widest">TextGames</span>
        </div>

        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Sun className="hidden dark:block w-5 h-5" />
          <Moon className="block dark:hidden w-5 h-5" />
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4 from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            TextGames
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            juegos de letras y numeros
          </p>
        </div>

        {/* Lista de Juegos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => (
            <div
              key={game.id}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 hover:border-blue-500 transition-all group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{game.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{game.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 flex items-center justify-center border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} TextGames - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default Home
