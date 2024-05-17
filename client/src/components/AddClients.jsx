import {Link} from "react-router-dom";
import { useState } from "react";

function AddClients(props){
  const [clientData, setClientData] = useState({});

  function handleFormSubmit(event){
    event.preventDefault();
    fetch("http://localhost:3001/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clientData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));
  }

  function handleChange(e){
    const {name, value} = e.target;
    setClientData({...clientData, [name]: value})
  }

  return (
    <>
    <Link to="/clients">Back to clients</Link>
      <p>Add Clients component</p>
      <br />
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="razon_social">Razón Social: </label>
        <input type="text" id="razon_social" name="razon_social" onChange={handleChange} /><br />

        <label htmlFor="pais">País: </label>
        <input type="text" id="pais" name="pais" onChange={handleChange} /><br />

        <label htmlFor="estado">Estado: </label>
        <input type="text" id="estado" name="estado" onChange={handleChange} /><br />

        <label htmlFor="municipio">Municipio: </label>
        <input type="text" id="municipio" name="municipio" onChange={handleChange} /><br />

        <label htmlFor="localidad">Localidad: </label>
        <input type="text" id="localidad" name="localidad" onChange={handleChange} /><br />

        <label htmlFor="calle">Calle: </label>
        <input type="text" id="calle" name="calle" onChange={handleChange} /><br />

        <label htmlFor="colonia">Colonia: </label>
        <input type="text" id="colonia" name="colonia" onChange={handleChange} /><br />

        <label htmlFor="codigo_postal">Código Postal: </label>
        <input type="text" id="codigo_postal" name="codigo_postal" onChange={handleChange} /><br />

        <label htmlFor="numero_exterior">Número exterior: </label>
        <input type="text" id="numero_exterior" name="numero_exterior" onChange={handleChange} /><br />

        <label htmlFor="numero_interior">Número Interior: </label>
        <input type="text" id="numero_interior" name="numero_interior" onChange={handleChange} /><br />

        <label htmlFor="rfc">RFC: </label>
        <input type="text" id="rfc" name="rfc" onChange={handleChange} /><br />

        <button className="hover:bg-green-400 bg-green-500 text-white py-2 px-4 rounded" type="submit" value="Save">Save</button>
      </form>
    </>
  );
}

export default AddClients;