import {Link, useParams} from "react-router-dom";
import { useState, useEffect } from "react";

function UserDetails(props) {
   const [user, setUser] = useState([]);
   const params = useParams();
   //console.log(params);

   useEffect(()=>{
      (async ()=>{try {
         const response = await fetch("http://localhost:3001/user/" + params.id)
         const data = await response.json()
         if(data){
            //console.log(data.user);
            setUser(data) 
         }
      } catch (error) {
         console.error(error);
      }
      })()
   },[params.id])

   const userData = Object.entries(user);
   //console.log(userData);
 
      return (
         <>
            <Link to="/users">Back to Users</Link>
            <p>User Details</p>
            {user && (
               <div className="overflow-x-auto">
               <table className="table-auto w-full">
                  <thead>
                     <tr>
                        <th className="border border-gray-300 py-2 px-4">Attribute</th>
                        <th className="border border-gray-300 py-2 px-4">Value</th>
                     </tr>
                  </thead>
                  <tbody>
                     {userData.map(([key, value]) => (
                        <tr key={key}>
                           <td className="border border-gray-300 py-2 px-4">{key}</td>
                           <td className="border border-gray-300 py-2 px-4 text-left">{value}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               </div>
               ) 
            }
         </>
       );
   }
 
export default UserDetails;