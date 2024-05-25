import {useSelector} from "react-redux";
import Product from "./Product";

export default function Sales(){

  const products = useSelector(state => state.products);
  

  return (
    <>
      <p>Sales component</p>
      <Product details={products} />
    </>
  );
}