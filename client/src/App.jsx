import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Menu from './components/Menu';
import "tailwindcss/tailwind.css"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
