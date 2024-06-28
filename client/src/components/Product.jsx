import { useState, useEffect } from "react";

export default function Product(props) {
  console.log(props)
  const {user} = props;
  console.log(user)
  const [carrito, setCarrito] = useState([]);
  const { details, clientId } = props; // Destructure clientId from props

  useEffect(() => {
    console.log(carrito);
  }, [carrito]);

  function handleIncrementClick(productId) {
    setCarrito(prevCarrito => 
      prevCarrito.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrementClick(productId) {
    setCarrito(prevCarrito => 
      prevCarrito.map(item => 
        item.id === productId && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  }

  function handleAddCarrito(e) {
    const selectedProduct = details.find((product) => product.titulo === e.target.value);
    if (selectedProduct) {
      setCarrito(prevCarrito => [
        ...prevCarrito,
        { ...selectedProduct, quantity: 1 },
      ]);
    }
  }

  function handleSale() {
    if (!clientId) {
      alert('Please select a client before making a sale.');
      return;
    }
  
    if (!user) {
      alert('User information not available. Unable to make the sale.');
      return;
    }
  
    const apiUrl = 'http://localhost:3001/make-sale';
    
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientId: clientId,
        userId: user[0].id,
        products: carrito.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.precio,
        }))
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle successful sale
    })
    .catch((error) => {
      console.error('Error:', error);
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
                <button className="px-4" onClick={() => handleIncrementClick(item.id)}>Add 1</button>
                <button className="px-4" onClick={() => handleDecrementClick(item.id)}>Sub 1</button>
                <span className="px-4">{item.quantity}</span>
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
