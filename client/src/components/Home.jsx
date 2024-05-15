import Categories from './Categories';
import Dashboard from './Dashboard';
import UserDetails from './UserDetails';
import Products from './Products';
import {Routes, Route, NavLink, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import GoogleSignIn from "./GoogleSignIn";
import Login from "./Login";
import Users from './Users';

function getClassName({isActive}){
  if(isActive){
    return "active";
  }
}

function Home(){
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  function handleSignOut(){
    setUser({});
    setIsLoggedIn(false);
  }

  return (
    <>
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
                    <NavLink className={getClassName} to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink className={getClassName} to="/products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink className={getClassName} to="/categories">Categories</NavLink>
                  </li>
                  <li>
                    <NavLink className={getClassName} to="/users">Users</NavLink>
                  </li>
                </ul>
              </nav>
            </aside>
            
            <main className='flex-grow'>
              <div className='absolute top-0 right-0 m-4'>
                <button onClick={handleSignOut}>Sign out</button>
                <p className='font-bold'>You are currently viewing {location.pathname}</p>
              </div>
              <div className='flex justify-center'>
                <div>
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
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
    </>
  );
}

export default Home;