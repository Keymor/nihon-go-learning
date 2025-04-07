import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
//import WordList from './pages/wordlist'
import Lessons from './pages/lessons'
import Vocabulary from './pages/vocabulary'
import Cards from './pages/cards'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/lessons' element={<Lessons />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/vocabulary' element={<Vocabulary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
