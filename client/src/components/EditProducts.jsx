import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";

function EditProducts(){
   const [productData, setProductData] = useState(null);

   const params = useParams();
   const products = useSelector(state => state.products);

   const filteredProduct = products.filter((product)=>{
      return product.id === params.id;
   })

   //console.log({params});
   //console.log({products});
   //console.log({filteredProduct})

   const {id, codigo, costo, iva, precio, titulo, unidad, stock} = filteredProduct[0];

   function handleFormSubmit(event){
      event.preventDefault();
      fetch("http://localhost:3001/product/" + id, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(productData)
      })
      .then(response => response.json())
      .then(data => {
         console.log(data);
      })
   }

   function handleChange(e){
      const {name, value} = e.target;
      setProductData({...productData, [name]: value});
   }

   return (
      <>
         <Link to="/products">Back to products</Link>
         <p>Edit products component</p>
         
         <form onSubmit={handleFormSubmit}>
            <label htmlFor="id">Id: </label>
            <input type="text" name="id" value={id} disabled="disabled" onChange={handleChange} /><br />
            
            <label htmlFor="codigo">Código: </label>
            <input type="text" name="codigo" placeholder={codigo} onChange={handleChange} /><br />

            <label htmlFor="titulo">Título: </label>
            <input type="text" name="titulo" placeholder={titulo} onChange={handleChange} /><br />

            <label htmlFor="costo">Costo: </label>
            <input type="text" name="costo" placeholder={costo} onChange={handleChange} /><br />

            <label htmlFor="iva">IVA: </label>
            <input type="text" name="iva" placeholder={iva} onChange={handleChange} /><br />

            <label htmlFor="precio">Precio: </label>
            <input type="text" name="precio" placeholder={precio} onChange={handleChange} /><br />

            <label htmlFor="unidad">Unidad: </label>
            <input type="text" name="unidad" placeholder={unidad} onChange={handleChange} /><br />

            <label htmlFor="stock">Stock: </label>
            <input type="text" name="stock" placeholder={stock} onChange={handleChange} /><br />

            <button className="hover:bg-green-400 bg-green-500 text-white py-2 px-4 rounded" type="submit" value="Update">Update</button>
         </form>
      </>
   );
}

export default EditProducts;