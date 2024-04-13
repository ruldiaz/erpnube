import { useState } from "react";

function Menu() {

  const [userData, setUSerData] = useState(null);

  const fetchData = () => {
    fetch('http://localhost:3001/user?limit=20&offset=0')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Do something with the fetched data
        console.log(data);
        setUSerData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <>
        <button onClick={fetchData} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Usuarios</button>
              {/* Render the fetched data */}
      {userData && (
        <div>
          {/* Display user data here */}
          {userData.map(user => (
            <div key={user.id}>
              <p>Name: {user.username}</p>
              <p>Email: {user.email}</p>
              {/* Add more user data fields as needed */}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Menu;