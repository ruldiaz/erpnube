import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Product from "./Product";

export default function Sales() {
  const [client, setClient] = useState(null);
  const [user, setUser] = useState(null);
  
  const products = useSelector(state => state.products);
  const clients = useSelector(state => state.clients);
  const users = useSelector(state => state.users);
  console.log(user)
  
  useEffect(() => {
    fetch("http://localhost:3001/user")
    .then(response => response.json())
    .then(data=>{
      if(data){
        //console.log(data);
      const filterUser = data?.usersList.filter((user)=>{
        return user.email === users.email
      })
      //console.log(filterUser)
      setUser(filterUser)
      }
      
    })
  
    console.log(client);
  }, [client]);

  function handleClientChange(e) {
    const selectedClient = clients.find(client => client.razon_social === e.target.value);
    if (selectedClient) {
      setClient(selectedClient.id);
    }
  }

  return (
    <>
      <p>Sales component</p>
      <select onChange={handleClientChange}>
        <option value="">Selecciona un cliente</option>
        {clients.map(client => (
          <option key={client.id}>{client.razon_social}</option>
        ))}
      </select>
      <Product details={products} clientId={client} user={user}/>
    </>
  );
}
