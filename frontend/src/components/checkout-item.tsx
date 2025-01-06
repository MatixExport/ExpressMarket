import {
    TableCell,
    TableRow,
    } from "@/components/ui/table"


import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import ShopCartItem from "@/types/shop-cart-item";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "./ui/input";
import { X } from "lucide-react"


interface CheckoutItemProps{
    cartItem:ShopCartItem,
    onQuantityChange:(quantity:number)=>void,
    onItemRemove:()=>void
}



const CheckoutItem: React.FC<CheckoutItemProps> = ({
    cartItem,
    onQuantityChange,
    onItemRemove}) => {

    const [quantity,setQuantity] = useState(cartItem.quantity)

    useEffect(()=>{
        onQuantityChange(quantity)
    },[quantity])


    return (
    <TableRow key={cartItem.product.id}>
    <TableCell>{cartItem.product.name}</TableCell>
    <TableCell>{cartItem.product.description}</TableCell>
    <TableCell>{cartItem.product.price}</TableCell>
    <TableCell>{cartItem.product.weight}</TableCell>
    <TableCell>
        <div className="flex gap-x-2">
            <Button variant="outline" size="icon" onClick={(e)=>{
                if(quantity > 1){
                    setQuantity((prevState)=>(
                        prevState-1
                    ));
                }
            }}>
            <ChevronLeft />
        </Button>
            <Input type="number" value={quantity} className="max-w-fit" onChange={(e)=>{
                const value = parseInt(e.target.value)
                setQuantity(value)
             
            }} />
            <Button variant="outline" size="icon" onClick={(e)=>{
                setQuantity((prevState)=>(
                    prevState+1
                    
                ));
            }}>
                <ChevronRight />
            </Button>
        </div>
    </TableCell>
    <TableCell>
            <Button size="icon" variant="ghost" onClick={(_)=>{onItemRemove()}}>
                <X/>
            </Button>
    </TableCell>
    </TableRow>
    );
};

export default CheckoutItem;







