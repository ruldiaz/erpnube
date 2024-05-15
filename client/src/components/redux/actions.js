

export function getProducts(){

  return async function(){
    let response = await fetch("http://localhost:3001/products");
    let data = await response.json();
    if(data){
      console.log(data)
      
    }
  }
}