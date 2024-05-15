import { useState } from "react";
import {Link, useLocation} from "react-router-dom";

function Users() {

  const [userData, setUSerData] = useState(null);

  const location = useLocation();

  function fetchData() {
    fetch('http://localhost:3001/user')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Do something with the fetched data
        //console.log(data.usersList);
        setUSerData(data.usersList);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <>
      <br />
      <p>Users Component</p>
      <p>You are currently viewing {location.pathname}</p>
      {<button onClick={fetchData} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Click to show users</button>}
      {/* Render the fetched data */}
      {userData && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr key={user.id}>
                  <Link to={"/user/"+user.id}><td>{user.id}</td></Link>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Users;