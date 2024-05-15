import {useSelector, useDispatch} from "react-redux";
import {decrement, increment, reset} from "./redux/store.js";

function Dashboard() {
   const counter = useSelector( state => state.value);
   const dispatch = useDispatch();

   return (
      <>
      <br />
         <p>Dashboard component</p>
         <p>Practicing redux</p>
         <h2>The counter value is {counter}</h2>
         <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={()=>dispatch(increment())}>Add 1</button>
         
         <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={()=>dispatch(decrement())}>Decrement 1</button>

         <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={()=>dispatch(reset())}>Reset</button>
      </>
   );
}

export default Dashboard;