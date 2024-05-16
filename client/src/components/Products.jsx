import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { setProducts } from "./redux/store";
import {Link} from "react-router-dom";

function Products(props){

   //const [products, setProducts] = useState([]);
   const productsDataRedux = useSelector(state => state.products);
   const dispatch = useDispatch();

   /*useEffect(()=>{
      (async ()=>{
         try {
            const response = await fetch("http://localhost:3001/products");
            const data = await response.json();
            if(data){
               //console.log(data[0]);
               setProducts(data[0])
            }
         } catch (error) {
            console.error(error);
         }
      })()
   },[])*/

   useEffect(() => {
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
      fetchProducts();
    }, [dispatch]);


   
  //console.log(productsDataRedux)
  
  return (
<>
      <br />
      <p className="text-xl font-bold mb-4">Products Component</p>
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
                  <Link to={"/editproducts/" + product.id}><td className="border text-center px-4 py-2">Edit</td></Link>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
 );
}

export default Products;