import { useState, useEffect } from "react";

export default function Product(props){
  const [counter, setCounter] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const {details} = props;

  //console.log(details)

  useEffect(()=>{
    console.log(carrito)
  },[carrito])
  
  function handleIncrementClick(){
    setCounter(counter + 1);
  }

  function handleDecrementClick(){
    if(counter > 0){
      setCounter(counter - 1);
    }
  }

  function handleAddCarrito(e){
    const selectedProduct = details.filter((product)=>{
      return product.titulo === e.target.value;
    })
    setCarrito(prevCarrito => [
      ...prevCarrito,
      selectedProduct[0]
    ])
    
  }

  return (
    <>

      <table>
        <thead>
          <th>Codigo</th>
          <th>Unidad</th>
          <th>Concepto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Importe</th>
        </thead>
        <tbody>
        <select onChange={(e)=>handleAddCarrito(e)}>
        <option value="">Agregar Producto</option>
        {details.map((item)=>(
          <option key={item.id}>{item.titulo}</option>
        ))}
      </select>
            {carrito.map((item)=>(
              <tr key={item.id}>
                <td>{item.codigo}</td>
                <td>{item.unidad}</td>
                <td>{item.titulo}</td>
                <td><button onClick={handleIncrementClick}> Add 1 </button><button onClick={handleDecrementClick}> Sub 1 </button></td>
                <td>{item.precio}</td>
                <td></td>
                </tr>
            ))}
          
        </tbody>
      </table>
    </>
  );
}