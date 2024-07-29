import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSupplier, setSuppliers } from "./redux/store";
import { Link } from "react-router-dom";
import { FaRegPenToSquare, FaDeleteLeft } from "react-icons/fa6";

function Purchases(props) {
const purchasesDataRedux = useSelector(state => state.purchases);
const dispatch = useDispatch();

async function fetchPurchases(){
  try {
    const response = await fetch("http://localhost:3001/purchase")
    const data = await response.json();
    if(data){
      dispatch(setPurchases(data));
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
  fetchPurchases();
},[dispatch])

function handleDeleteClick(id){
  fetch("http://localhost:3001/purchase" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id})
  })
  .then(response => response.json())
  .then(date => {
    console.log(data);
    dispatch(deletePurchase(id));
    fetchPurchases();
  })
  .catch(error => console.error(error));
}

  return (
    <>
      <br />
      <p className="text-xl font-bold mb-4">Purchases Component</p>
      <div className="flex justify-end">
        <Link to="/addpurchase"><button className="hover:bg-blue-200 bg-blue-300 py-2 px-4 mb-2 rounded">Add Purchase</button></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Id</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Razón Social</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">País</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Estado</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Municipio</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Localidad</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Calle</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Colonia</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">Código Postal</th>
              <th className="bg-blue-500 px-4 py-2 rounded text-white">RFC</th>
              <th className="bg-gray-500 px-4 py-2 rounded text-white">Edit</th>
            </tr>
          </thead>
          <tbody>
            {purchasesDataRedux &&
            purchasesDataRedux.map((purchase, index)=>(
              <tr key={index}>
                <td className="border px-4 py-2">{purchase.id}</td>
                <td className="border px-4 py-2" >{purchase.razon_social}</td>
                <td className="border px-4 py-2">{purchase.pais}</td>
                <td className="border px-4 py-2">{purchase.estado}</td>
                <td className="border px-4 py-2">{purchase.municipio}</td>
                <td className="border px-4 py-2">{purchase.localidad}</td>
                <td className="border px-4 py-2">{purchase.calle}</td>
                <td className="border px-4 py-2">{purchase.colonia}</td>
                <td className="border px-4 py-2">{purchase.codigo_postal}</td>
                <td className="border px-4 py-2">{purchase.rfc}</td>
                <Link to={"/editpurchases/" + purchase.id}><td className="rounded hover:text-green-400 text-green-500 border text-center px-4 py-2"><FaRegPenToSquare /></td></Link>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Purchases;