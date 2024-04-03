import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

function Home() {
  const [user, setUser] = useState({});
  
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
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
      })
      .catch(error=>{
        console.error(error);
      })
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
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
  return (
    <>
      <div>
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
      </div>
    </>
  );
}

export default Home;