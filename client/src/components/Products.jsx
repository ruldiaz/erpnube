import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { deleteProduct, setProducts } from "./redux/store";
import {Link} from "react-router-dom";
import { FaRegPenToSquare, FaDeleteLeft } from "react-icons/fa6";

function Products(props){

   const productsDataRedux = useSelector(state => state.products);
   const dispatch = useDispatch();

   const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      if (data) {
        dispatch(setProducts(data));
        //console.log(data)
      }
    } catch (error) {
      console.error(error);
    }
  };
  
   useEffect(() => {
      fetchProducts();
    }, [dispatch]);

    
   function handleDeleteClick(id){
      fetch("http://localhost:3001/product/" + id, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({id})
      })
      .then(response => response.json())
      .then(data => {
         console.log(data)
         dispatch(deleteProduct(id));
         fetchProducts();
      })
      .catch(error=>console.error(error));
   }
  
  return (
<>
      <br />
      <p className="text-xl font-bold mb-4">Products Component</p>
      <div className="flex justify-end">
        <Link to="/addproducts"><button className="hover:bg-blue-200 bg-blue-300 py-2 px-4 mb-2 rounded">Add Product</button></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">ID</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Title</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Code</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Cost</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">IVA</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Unit</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Price</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Stock</th>
              <th className="bg-gray-500 px-4 py-2 rounded text-white">Edit</th>
            </tr>
          </thead>
          <tbody>
            {productsDataRedux &&
              productsDataRedux.map((product, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{product.id}</td>
                  <td className="border px-4 py-2">{product.titulo}</td>
                  <td className="border px-4 py-2">{product.codigo}</td>
                  <td className="border px-4 py-2">{product.costo}</td>
                  <td className="border px-4 py-2">{product.iva}</td>
                  <td className="border px-4 py-2">{product.unidad}</td>
                  <td className="border px-4 py-2">{product.precio}</td>
                  <td className="border px-4 py-2">{product.stock}</td>
                  <Link to={"/editproducts/" + product.id}><td className="rounded hover:text-green-400 text-green-500 border text-center px-4 py-2"><FaRegPenToSquare /></td></Link>
                  {product.stock === 0 && <button onClick={()=>handleDeleteClick(product.id)} className="border rounded px-4 py-2 text-red-500"><FaDeleteLeft /></button>}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
 );
}

export default Products;