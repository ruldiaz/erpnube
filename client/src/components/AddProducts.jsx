import {Link} from "react-router-dom";
import {useState} from "react";

function AddProducts(){
  const [productData, setProductData] = useState(null);

  function handleFormSubmit(event){
    event.preventDefault();
    fetch("http://localhost:3001/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error=>console.error(error));
  }

  function handleChange(e){
    const {name, value} = e.target;
    setProductData({...productData, [name]: value});
  }

  return (
    <>
      <Link to="/products">Back to products</Link>
      <p>Add Products component</p>
      <br />
      <form onSubmit={handleFormSubmit}>               
        <label htmlFor="codigo">Código: </label>
        <input type="text" id="codigo" name="codigo" placeholder="Código del producto..." onChange={handleChange} /><br />

        <label htmlFor="titulo">Título: </label>
        <input type="text" id="titulo" name="titulo" placeholder="Título..." onChange={handleChange} /><br />

        <label htmlFor="costo">Costo: </label>
        <input type="text" id="costo" name="costo" placeholder="Costo..." onChange={handleChange} /><br />

        <label htmlFor="iva">IVA: </label>
        <input type="text" id="iva" name="iva" placeholder="0.16" onChange={handleChange} /><br />

        <label htmlFor="precio">Precio: </label>
        <input type="text" id="precio" name="precio" placeholder="0.00" onChange={handleChange} /><br />

        <label htmlFor="unidad">Unidad: </label>
        <input type="text" id="unidad" name="unidad" placeholder="Unidad de medida..." onChange={handleChange} /><br />

        <label htmlFor="stock">Stock: </label>
        <input type="text" id="stock" name="stock" placeholder="0.00" onChange={handleChange} /><br />

        <button className="hover:bg-green-400 bg-green-500 text-white py-2 px-4 rounded" type="submit" value="Save">Save</button>   
      </form>
    </>
  );
}

export default AddProducts;