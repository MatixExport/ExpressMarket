
import { useContext } from "react";
import { CartContext } from "@/providers/shop-cart-provider";


const useCart = () => {
    return useContext(CartContext);
  };

export default useCart