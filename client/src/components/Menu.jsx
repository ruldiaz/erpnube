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
        console.log(data.usersList);
        setUSerData(data.usersList);
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr key={user.id}>
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

export default Menu;