import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ShopCartItem from "@/types/shop-cart-item";


interface CartContextValue {
    items:ShopCartItem[],
    setItems:(items:ShopCartItem[])=>void,
    addItem:(item:ShopCartItem)=>void,
    removeItem:(item:ShopCartItem)=>void
}

export const CartContext = createContext<CartContextValue>({
    items:[],
    setItems:(items:ShopCartItem[])=>{},
    addItem:(item:ShopCartItem)=>{},
    removeItem:(item:ShopCartItem)=>{}
});

const ShopCartProvider = ({ children }:any) => {
    const [items,setItems] = useState<ShopCartItem[]>([])

    const addItem = (item:ShopCartItem)=>{
        let itemExists = false
        const existingItem = items.map((el)=>{
            if(el.product.id === item.product.id){
                itemExists = true
            }
        })
    }

    const removeItem = (item:ShopCartItem)=>{

    }
    

    useEffect(()=>{


    },[])

    const contextValue = useMemo(
    () => ({
        items,
        setItems,
        addItem,
        removeItem
    }),
    []
    );

    return(
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
        
    )
    };

export default ShopCartProvider