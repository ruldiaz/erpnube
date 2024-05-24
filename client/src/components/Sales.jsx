import { useSelector } from "react-redux";
import { useState } from "react";


function Sales() {
 
  
  const clients = useSelector(state => state.clients);
  const products = useSelector(state => state.products);
  const users = useSelector(state => state.users);

  const [carrito, setCarrito] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [sale, setSale] = useState({
    fecha: new Date().toISOString().slice(0, 10), // Format date as YYYY-MM-DD
    razon_social: '',
    data: [],
    total: 0,
    clientId: '',
    userId: users[0]?.id
  });


  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Submitting sale:", sale);
    fetch("http://localhost:3001/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sale)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Server response:", data);
      // Optionally reset the form or update the state
    })
    .catch(error => console.error("Error:", error));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    const selectedProduct = products.filter((product)=>{
      return product.id === event.target.value;
    })
    setCarrito([...carrito, selectedProduct[0]]);
    console.log(selectedProduct)
    setSale(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(carrito);
  }

function handleQuantityChange(e){
  setQuantity(e.target.value);
}
console.log(quantity)

  return (
    <>
      <p>Sales component</p>
      <br />
      <form onSubmit={handleFormSubmit}>
        
        <label htmlFor="fecha">Fecha: </label>
        <input type="date" id="fecha" name="fecha" value={sale.fecha} onChange={handleInputChange} /><br />

        <label htmlFor="razon_social">Cliente: </label>
        <select id="razon_social" name="razon_social" value={sale.razon_social} onChange={handleInputChange}>
          <option value="">Seleccione un cliente</option>
          {clients && clients.map((client) => (
            <option key={client.id} value={client.razon_social}>
              {client.razon_social}
            </option>
          ))}
        </select><br />

        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Unidad</th>
              <th>Concepto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Importe</th>
              <th>Descuento</th>
              <th>Comentarios</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            
              {carrito.map((item)=>(
                <tr>
                  <td>{item?.codigo}</td>
                  <td>{item?.unidad}</td>
                  <td>{item?.titulo}</td>
                  <td>
                    <input type="number" name="quantity" value={quantity} onChange={handleQuantityChange} />
                  </td>
                </tr>
              ))}
            
            <tr>
              <td> {/* Inicio Celda Producto */}
                <select id="producto" onChange={handleInputChange}>
                  <option value="">Agregar producto</option>
                  {products.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.titulo}
                    </option>
                  ))}
                </select>
              </td>{/* Fin Celda Producto */}
            </tr>
          </tbody>
        </table>
        <br />
        <button
          className="hover:bg-green-400 bg-green-500 text-white py-2 px-4 rounded"
          type="submit"
          value="Save"
        >
          Save
        </button>
        
      </form>
    </>
  );
}

export default Sales;
