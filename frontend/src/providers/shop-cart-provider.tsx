import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TokenPair } from "../types/token-pair-type";
import { fetchUserData } from "../lookup";
import ShopCartItem from "@/types/shop-cart-item";
import { Product } from "@/types/product-type";

interface CartContextValue {
    items:ShopCartItem[],
    addItem:
}

export const CartContext = createContext<CartContextValue>({
    items:[],
    addItem:(item:ShopCartItem)=>void
});

const ShopCartProvider = ({ children }:any) => {
    const [items,setItems] = useState([])

    const addItem = (item:ShopCartItem)=>{

    }
    

    useEffect(()=>{


    },[])

    const contextValue = useMemo(
    () => ({
        items,
        addItem
    }),
    []
    );

    return(
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
        
    )
    };

export default CartContext