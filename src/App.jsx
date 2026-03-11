import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WordlePage from './pages/games/Wordle/WordlePage'
import ChronoPage from './pages/games/ChronoGuessr/ChronoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wordle" element={<WordlePage />} />
        <Route path="/chrono" element={<ChronoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
