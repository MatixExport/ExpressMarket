import { useMemo, useState } from "react";
import { ShoppingCartIcon,ShoppingBag } from "lucide-react"; // Using Lucide React for the cart icon
import useCart from "@/hooks/use-cart";
import { Button } from "./ui/button";
import ShopCartItem from "@/types/shop-cart-item";
import SimpleProductList from "./simple-product-list";


import { HoverCard,
    HoverCardContent,
    HoverCardTrigger } from "./hover-card";


const ShoppingCart = ()=> {
  const {items} = useCart()

  const itemCount = useMemo(()=>{
    return items.reduce<number>((accumulator, item: ShopCartItem) => {
        return accumulator + item.quantity;
      }, 0);
  },[items])


  return (


    <HoverCard openDelay={0}>
    <HoverCardTrigger>
        <Button variant="outline" size="icon" className="relative">
            <div className="inline-block">
            <ShoppingBag className="w-7 h-7 text-foreground" />
            {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs bg-popover-foreground text-popover">
            {itemCount}
            </span>
            )}
            </div>
            <span className="sr-only">Shop cart</span>
        </Button>
    </HoverCardTrigger>
        <HoverCardContent className="max-h-64 overflow-auto">
            <SimpleProductList items={items} />
        </HoverCardContent>
    </HoverCard>
  );
}
export default ShoppingCart;