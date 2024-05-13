import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Menu from './components/Menu';
import "tailwindcss/tailwind.css"

function App() {
  

  return (
    <>
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>  
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </main>
      </BrowserRouter>
    </>
  )
}

export default App
