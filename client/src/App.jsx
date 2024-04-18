import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Menu from './components/Menu';
import "tailwindcss/tailwind.css"

function App() {
  

  return (
    <BrowserRouter>
    <div className='flex'>
        <div className='flex-1 flex justify-center items-center'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </div>
    </div>
    </BrowserRouter>
  )
}

export default App
