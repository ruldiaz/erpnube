import {useState, useEffect} from "react";

function Products(props){

   const [products, setProducts] = useState([]);

   useEffect(()=>{
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
   },[])
   
   const productsData = Object.entries(products);
   //console.log(productsData)

   return (
      <>
      <br />
         <p>Products Component</p>
         {productsData && (
            <div className="overflow-x-auto">
               <table className="table-auto w-full">
                  <thead>
                     <tr>
                        <th className="border-gray-300 py-2 px-4">Attribute</th>
                        <th className="border-gray-300 py-2 px-4">Value</th>
                     </tr>
                  </thead>
                  <tbody>
                     {productsData.map(([key,value])=>(
                        <tr key={key}>
                           <td className="border border-gray-300 py-2 px-4">{key}</td>
                           <td className="border border-gray-300 py-2 px-4">{value}</td>
                        </tr>
                     ))

                     }
                  </tbody>
               </table>
            </div>
         )}   
      </>
   );
}

export default Products;