import './App.css'
import "tailwindcss/tailwind.css"
import { useState } from "react";
import GoogleSignIn from "./components/GoogleSignIn";
import Login from "./components/Login";
import Users from './components/Users';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Categories from './components/Categories';


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
        <div className="flex">
          <div>
            {!isLoggedIn && (
              <>
                <h1 className="my-5">Home Component Login Page</h1>
                <Login user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <GoogleSignIn user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
              </>
            )}     
            
            {isLoggedIn && (
              <>
                <button onClick={handleSignOut}>Sign out</button>
                <nav>
                  <ul>
                    <li>
                      <Link to="/categories">Categories</Link>
                    </li>
                    <li>
                      <Link to="/users">Users</Link>
                    </li>
                  </ul>
                </nav>
                <main>
                  <Routes>
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/users" element={<Users />} />
                  </Routes>
                </main>
              </>
            )} 
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App
