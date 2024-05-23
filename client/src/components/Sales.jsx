import { useSelector } from "react-redux";
import { useState } from "react";

function Sales() {
  const [sale, setSale] = useState({
    fecha: new Date().toISOString().slice(0, 10),  // Format date as YYYY-MM-DD
    razon_social: '',
    data: [],
    total: 0
  });

  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const clients = useSelector(state => state.clients);
  const products = useSelector(state => state.products);

  function handleFormSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3001/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sale)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Optionally reset the form or update the state
    })
    .catch(error => console.error(error));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setSale(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleProductSelection(event) {
    const { value } = event.target;
    setSelectedProduct(value);
  }

  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  function handleAddProduct() {
    const product = products.find(product => product.titulo === selectedProduct);

    if (product) {
      const newProduct = {
        product: product.titulo,
        quantity: parseInt(quantity, 10),
        price: product.precio,  // Fetch price from the product state
        importe: product.precio * parseInt(quantity, 10)
      };

      const updatedData = [...sale.data, newProduct];
      const updatedTotal = updatedData.reduce((sum, item) => sum + item.importe, 0);

      setSale(prevState => ({
        ...prevState,
        data: updatedData,
        total: updatedTotal
      }));

      // Reset product selection and quantity
      setSelectedProduct('');
      setQuantity(1);
    }
  }

  return (
    <>
      <p>Sales component</p>
      <br />
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="fecha">Fecha: </label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={sale.fecha}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="razon_social">Cliente: </label>
        <select
          id="razon_social"
          name="razon_social"
          value={sale.razon_social}
          onChange={handleInputChange}
        >
          <option value="">Seleccione un cliente</option>
          {clients && clients.map((client) => (
            <option key={client.razon_social} value={client.razon_social}>
              {client.razon_social}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="producto">Producto: </label>
        <select id="producto" value={selectedProduct} onChange={handleProductSelection}>
          <option value="">Seleccione un producto</option>
          {products.map((producto) => (
            <option key={producto.titulo} value={producto.titulo}>
              {producto.titulo}
            </option>
          ))}
        </select>
        <br />
        {selectedProduct && (
          <>
            <label htmlFor="quantity">Cantidad: </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
            />
            <br />
            <button
              type="button"
              onClick={handleAddProduct}
              className="hover:bg-blue-400 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Product
            </button>
            <br />
          </>
        )}
        <h3>Productos seleccionados:</h3>
        <ul>
          {sale.data.map((item, index) => (
            <li key={index}>
              {item.product} - Cantidad: {item.quantity} - Precio: {item.price} - Importe: {item.importe}
            </li>
          ))}
        </ul>
        <h3>Total: {sale.total}</h3>
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
