import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { setProducts } from "./redux/store";

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
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Cost</th>
              <th className="px-4 py-2">IVA</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Price</th>
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
 );
}

export default Products;