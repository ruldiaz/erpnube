import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import Menu from "./components/Menu";


function Home() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setIsLoggedIn(true);
    document.getElementById("signInDiv").hidden = true;

    const body = { google_token: response.credential }
    fetch("http://localhost:3001/auth/google", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then( resp => resp.json() )
      .then( resp => {
        console.log(resp);
        // redirect to menu
        
      })
      .catch(error=>{
        console.error(error);
      })
  }

  function handleSignOut(event){
    setUser({});
    setIsLoggedIn(false);
    document.getElementById("signInDiv").hidden = false;
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
  }

  useEffect(()=>{
    /*global google*/ 
    google.accounts.id.initialize({
      client_id: "1057423200251-2c3l554pg4bh74f6loob2f4e95togmqq.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );

    google.accounts.id.prompt();
  }, [])

  // if we have a user show log out button
  // if we have no user, show sign in button

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submitted with data: ", username, password);
  }


  return (
    <>
      <div className="flex flex-col justify-center h-screen">
      <h1 className="my-5">Home Component Login page</h1>

      <form onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          className="my-3 p-2 border border-gray-300 rounded-md"
        />

        <input 
          type="password" 
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit" className="my-3 p-2 bg-blue-500 text-white rounded-md">Login</button>
      </form>


        <div id="signInDiv"></div>
        { Object.keys(user).length != 0 &&
          <button onClick={(e)=>handleSignOut(e)}>Sign Out</button>
        }

        
        
        {user && 
          <div>
            <img src={user.picture} />
            <h3>{user.name}</h3>
          </div>
        }

        {isLoggedIn && <Menu />} {/* Render Menu component if user is logged in */}
      </div>
    </>
  );
}

export default Home;