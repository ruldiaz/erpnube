import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function EditClients(){
   const [clientData, setClientData] = useState(null);

   const params = useParams();
   const clients = useSelector(state => state.clients);

   const filteredClients = clients.filter((client)=>{
      return client.id === params.id;
   });

   const {id, razon_social, pais, estado, municipio, localidad, calle, colonia, codigo_postal, numero_exterior, numero_interior, rfc} = filteredClients[0] ;

   function handleFormSubmit(event){
      event.preventDefault();
      fetch("http://localhost:3001/client/" + id, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(clientData)
      })
      .then(response => response.json())
      .then(data => {
         console.log(data)
      })
      .catch(error => console.error(error))
   }

   function handleChange(e){
      const {name, value} = e.target;
      setClientData({...clientData, [name]: value});
   }

   return (
      <>
         <Link to="/clients">Back to clients</Link>
         <p>Edit Clients Component</p>
         <br />
         <form onSubmit={handleFormSubmit}>
            <label htmlFor="id">Id: </label>
            <input type="text" id="id" name="id" value={id} onChange={handleChange} disabled="disabled" /><br />

            <label htmlFor="razon_social">Razón Social: </label>
            <input type="text" id="razon_social" name="razon_social" onChange={handleChange} placeholder={razon_social} /><br />

            <label htmlFor="pais">País: </label>
            <input type="text" id="pais" name="pais" onChange={handleChange} placeholder={pais} /><br />

            <label htmlFor="estado">Estado: </label>
            <input type="text" id="estado" name="estado" onChange={handleChange} placeholder={estado} /><br />

            <label htmlFor="municipio">Municipio: </label>
            <input type="text" id="municipio" name="municipio" onChange={handleChange} placeholder={municipio} /><br />

            <label htmlFor="localidad">Localidad: </label>
            <input type="text" id="localidad" name="localidad" onChange={handleChange} placeholder={localidad} /><br />

            <label htmlFor="calle">Calle: </label>
            <input type="text" id="calle" name="calle" onChange={handleChange} placeholder={calle} /><br />

            <label htmlFor="colonia">Colonia: </label>
            <input type="text" id="colonia" name="colonia" onChange={handleChange} placeholder={colonia} /><br />

            <label htmlFor="codigo_postal">Código postal: </label>
            <input type="text" id="codigo_postal" name="codigo_postal" onChange={handleChange} placeholder={codigo_postal} /><br />

            <label htmlFor="numero_exterior">Número Exterior: </label>
            <input type="text" id="numero_exterior" name="numero_exterior" onChange={handleChange} placeholder={numero_exterior} /><br />

            <label htmlFor="numero_interior">Número Interior: </label>
            <input type="text" id="numero_interior" name="numero_interior" onChange={handleChange} placeholder={numero_interior} /><br />

            <label htmlFor="rfc">RFC: </label>
            <input type="text" id="rfc" name="rfc" onChange={handleChange} placeholder={rfc} /><br />

            <button className="hover:bg-green-400 bg-green-500 text-white py-2 px-4 rounded" type="submit" value="Update">Update</button>
         </form>
      </>
   );
}

export default EditClients;