import {useSelector} from "react-redux";
import { useState } from "react";


function Sales(){
  const [sale, setSale] = useState({
    fecha: '',
    razon_social: '',
    producto: '',
    cantidad: '',
    precio: '',
    total: ''
  });
  const clients = useSelector(state => state.clients);
  const products = useSelector(state => state.products);
  console.log(products);

  function handleFormSubmit(event){
    event.preventDefault();
    fetch("http://localhost:3001/sales",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(sale)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));
  }

  function handleChange(event){
    const {name, value} = event.target;
    setSale({...sale, [name]: value});
    console.log(sale);
  }

  return (
    <>
      <p>Sales component</p>
      <br />
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="fecha">Fecha: </label>
        <input type="text" id="fecha" name="fecha" placeholder={new Date().toISOString().split('T')[0].split('-').reverse().join('/')} />

        <label htmlFor="razon_social">Cliente: </label>
        <select id="razon_social" onChange={handleChange}>
        <option value="">Seleccione un cliente</option>
          {clients && clients.map((client)=>{
            return <option value={client.razon_social}>{client.razon_social}</option>
          })}
        </select><br />

        <label htmlFor="producto">Producto: </label>
        <select id="producto" onChange={handleChange}>
        <option value="">Seleccione un producto</option>
          {products.map((producto)=>{
            return <option value={producto.titulo}>{producto.titulo}</option>
          })}
        </select><br />

        <label htmlFor="cantidad">Cantidad: </label>
        <input type="text" name="cantidad" id="cantidad" onChange={handleChange} /><br />

        <label htmlFor="precio">Precio: </label>
        <input type="text" id="precio" name="precio" onChange={handleChange} /><br />

        <label htmlFor="total">Total: </label>
        <input type="text" id="total" name="total" onChange={handleChange} />

        <button className="hover:bg-green-400 bg-green-500 text-white py-2 px-4 rounded" type="submit" value="Save">Save</button>   
      </form>
    </>
  );
}

export default Sales;