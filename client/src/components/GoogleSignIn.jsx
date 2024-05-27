import React, {useState, useEffect} from "react";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { setUsers } from "./redux/store";

export default function GoogleSignIn(props){

  const dispatch = useDispatch();
  const {user, setUser, setIsLoggedIn}   = props;

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

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    dispatch(setUsers(userObject));
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
        window.localStorage.setItem("logged", resp.googleUser.name);
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
    google.accounts.id
    .disableAutoSelect();
  }

return (
  <>
    <div id="signInDiv"></div>
    { Object.keys(user).length != 0 &&
          <button onClick={(e)=>handleSignOut(e)}>Sign Out</button>
    }    
     
    {user && <div>
                <img src={user.picture} />
                <h3>{user.name}</h3>
            </div>
    }
  </>
);

}