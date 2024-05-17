import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteClient, setClients } from "./redux/store";
import { Link } from "react-router-dom";
import { FaRegPenToSquare, FaDeleteLeft } from "react-icons/fa6";

function Clients(props) {
const clientsDataRedux = useSelector(state => state.clients);
const dispatch = useDispatch();

async function fetchClients(){
  try {
    const response = await fetch("http://localhost:3001/client")
    const data = await response.json();
    if(data){
      dispatch(setClients(data));
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
  fetchClients();
},[dispatch])

function handleDeleteClick(id){
  fetch("http://localhost:3001/client" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id})
  })
  .then(response => response.json())
  .then(date => {
    console.log(data);
    dispatch(deleteClient(id));
    fetchClients();
  })
  .catch(error => console.error(error));
}

  return (
    <>
      <br />
      <p className="text-xl font-bold mb-4">Clients Component</p>
      <div className="flex justify-end">
        <Link><button className="hover:bg-blue-200 bg-blue-300 py-2 px-4 mb-2 rounded">Add Client</button></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Id</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Razón Social</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">País</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Estado</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Municipio</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Localidad</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Calle</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Colonia</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Código Postal</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">RFC</th>
              <th className="bg-gray-500 px-4 py-2 rounded text-white">Edit</th>
            </tr>
          </thead>
          <tbody>
            {clientsDataRedux &&
            clientsDataRedux.map((client, index)=>(
              <tr key={index}>
                <td className="border px-4 py-2">{client.id}</td>
                <td className="border px-4 py-2" >{client.razon_social}</td>
                <td className="border px-4 py-2">{client.pais}</td>
                <td className="border px-4 py-2">{client.estado}</td>
                <td className="border px-4 py-2">{client.municipio}</td>
                <td className="border px-4 py-2">{client.localidad}</td>
                <td className="border px-4 py-2">{client.calle}</td>
                <td className="border px-4 py-2">{client.colonia}</td>
                <td className="border px-4 py-2">{client.codigo_postal}</td>
                <td className="border px-4 py-2">{client.rfc}</td>
                <Link to={"/editclients/" + client.id}><td className="rounded hover:text-green-400 text-green-500 border text-center px-4 py-2"><FaRegPenToSquare /></td></Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Clients;