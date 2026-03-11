import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WordlePage from './pages/games/Wordle/WordlePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wordle" element={<WordlePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
