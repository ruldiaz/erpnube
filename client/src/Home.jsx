import { useState } from "react";
import Menu from "./components/Menu";
import GoogleSignIn from "./components/GoogleSignIn";
import Login from "./components/Login";


function Home() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSignOut(){
    setUser({});
    setIsLoggedIn(false);
  }

  
  return (
    <>
      <div className="flex flex-col justify-center h-screen">
      <h1 className="my-5">Home Component Login page</h1>

      {!isLoggedIn && <Login user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      
      <GoogleSignIn user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />

        {isLoggedIn && <Menu />} {/* Render Menu component if user is logged in */}
      </div>
    </>
  );
}

export default Home;