import { useState } from "react";

export default function Login(props){

  const {user, setUser, isLoggedIn, setIsLoggedIn} = props;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submitted with data: ", email, password);

    // send data to backend for authentication
    fetch("http://localhost:3001/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data=>{
      console.log(data);
      if(data.token){
        setUser(data)
        console.log(user);
        setIsLoggedIn(true);
      }
    })
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input 
          type="email" 
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
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
    </>
  );

}