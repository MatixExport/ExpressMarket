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
    removeItem:(item:ShopCartItem)=>void,
    setItemQuantity:(item:ShopCartItem)=>void,
    clearCart:()=>void
}

export const CartContext = createContext<CartContextValue>({
    items:[],
    setItems:(items:ShopCartItem[])=>{},
    addItem:(item:ShopCartItem)=>{},
    removeItem:(item:ShopCartItem)=>{},
    setItemQuantity:(item:ShopCartItem)=>{},
    clearCart:()=>{}
});

const ShopCartProvider = ({ children }:any) => {
    const [items,setItems] = useState<ShopCartItem[]>([])

    if(items.length > 0){
        localStorage.setItem("cart",JSON.stringify(items))
    }


    const loadFromStorage = ()=>{
        const loadedValue =localStorage.getItem("cart")
        if(loadedValue){
            return JSON.parse(loadedValue)
        }
        return null
    }

    const addItem = (item:ShopCartItem)=>{
        console.log(items)
        console.log(item)
        const existingItem = items.find((el)=>{return(el.product.id == item.product.id)})
        console.log(existingItem)
        if(existingItem !== undefined){
            const newItems = items.map((el)=>{
                if(el.product.id === item.product.id){
                    el.quantity += item.quantity
                    return el;
                }
                return el;
            })
            setItems(newItems)
            return
        }
        const newItems = [...items,item]
        setItems(newItems);
    }

    const removeItem = (item:ShopCartItem)=>{
        const newItems = items
        .filter((el)=>{
            return (item.product.id !== el.product.id)||(item.quantity < el.quantity)
        })
        .map((el)=>{
            if(item.product.id === el.product.id){
                el.quantity -= item.quantity
                return el
            }
            return el
        })
        setItems(newItems)
    }

    const clearCart = ()=>{
        setItems([])
        localStorage.removeItem("cart")
    }

    const setItemQuantity = (item:ShopCartItem)=>{
        const newItems = items
        .map((el)=>{
            if(item.product.id === el.product.id){
                el.quantity = item.quantity
                return el
            }
            return el
        })
        setItems(newItems)
    }

    useEffect(()=>{
        const savedItems = loadFromStorage()
        if(savedItems){
            setItems(savedItems)
        }
    },[])

    const contextValue = useMemo(
    () => ({
        items,
        setItems,
        addItem,
        removeItem,
        setItemQuantity,
        clearCart
    }),
    [items]
    );

    return(
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
        
    )
    };

export default ShopCartProvider