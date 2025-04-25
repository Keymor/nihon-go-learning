import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Lessons from './pages/lessons'
import Vocabulary from './pages/vocabulary'
import Cards from './pages/cards'
import Logout from './pages/logout'
import Kanji from './pages/kanji'
import Welcome from './pages/welcom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/home' element={<Home />} />
        <Route path='/lessons' element={<Lessons />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/vocabulary' element={<Vocabulary />} />
        <Route path='/kanji' element={<Kanji />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
