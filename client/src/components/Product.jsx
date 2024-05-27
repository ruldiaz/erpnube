import { useState, useEffect } from "react";

export default function Product(props){
  const [carrito, setCarrito] = useState([]);
  const {details} = props;

  useEffect(()=>{
    console.log(carrito);
  }, [carrito]);

  function handleIncrementClick(productId){
    setCarrito(prevCarrito => 
      prevCarrito.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrementClick(productId){
    setCarrito(prevCarrito => 
      prevCarrito.map(item => 
        item.id === productId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }

  function handleAddCarrito(e){
    const selectedProduct = details.find((product) => product.titulo === e.target.value);
    if (selectedProduct) {
      setCarrito(prevCarrito => [
        ...prevCarrito,
        { ...selectedProduct, quantity: 1 },
      ]);
    }
  }

  function handleSale(){
    // Assuming `apiUrl` is your backend endpoint
    const apiUrl = 'http://localhost:3001/update-inventory';
    carrito.forEach(item => {
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: item.id,
          quantity: item.quantity
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Unidad</th>
            <th>Concepto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          <select onChange={(e) => handleAddCarrito(e)}>
            <option value="">Agregar Producto</option>
            {details.map((item) => (
              <option key={item.id}>{item.titulo}</option>
            ))}
          </select>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.codigo}</td>
              <td>{item.unidad}</td>
              <td>{item.titulo}</td>
              <td>
                <button onClick={() => handleIncrementClick(item.id)}>Add 1</button>
                <button onClick={() => handleDecrementClick(item.id)}>Sub 1</button>
                {item.quantity}
              </td>
              <td>{item.precio}</td>
              <td>{item.precio * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSale}>Confirm Sale</button>
    </>
  );
}
