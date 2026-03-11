import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Wordle from './games/Wordle'
import Chrono from './games/Chrono'
import Hangman from './games/Hangman'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/chrono" element={<Chrono />} />
        <Route path="/hangman" element={<Hangman />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
