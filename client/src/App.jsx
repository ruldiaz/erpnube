import './App.css'
import "tailwindcss/tailwind.css"
import { useState } from "react";
import GoogleSignIn from "./components/GoogleSignIn";
import Login from "./components/Login";
import Users from './components/Users';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Categories from './components/Categories';
import Dashboard from './components/Dashboard';
import UserDetails from './components/UserDetails';


function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSignOut(){
    setUser({});
    setIsLoggedIn(false);
  }

  return (
    <>
      <BrowserRouter>
          <div className='flex flex-col'>
            {!isLoggedIn && (
              <>
                <div className='m-auto'>
                  <h1 className="my-5">Home Component Login Page</h1>
                  <Login user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                  <GoogleSignIn user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
                </div>
              </>
            )}     
            
            {isLoggedIn && (
              <>

                <aside className='flex flex-col'>
                  <nav className='w-48 bg-gray-200'>
                    <ul>
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/categories">Categories</Link>
                      </li>
                      <li>
                        <Link to="/users">Users</Link>
                      </li>
                    </ul>
                  </nav>
                </aside>
                
                <main className='flex-grow'>
                  <div className='absolute top-0 right-0 m-4'>
                    <button onClick={handleSignOut}>Sign out</button>
                  </div>
                  <div className='flex justify-center'>
                    <div>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/user/:id" element={<UserDetails />} />
                       </Routes>
                    </div>
                  </div>


                </main>
              </>
            )} 
          </div>
        
      </BrowserRouter>
    </>
  );
}

export default App
