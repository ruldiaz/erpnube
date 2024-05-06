import { useState } from "react";

import Menu from "./components/Menu";
import GoogleSignIn from "./components/GoogleSignIn";
import Login from "./components/Login";


function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  return (
    <>
      <div className="flex flex-col justify-center h-screen">
      <h1 className="my-5">Home Component Login page</h1>

      <Login />
      <GoogleSignIn setIsLoggedIn={setIsLoggedIn} />
      
        {isLoggedIn && <Menu />} {/* Render Menu component if user is logged in */}
      </div>
    </>
  );
}

export default Home;