
import {
Table,
TableBody,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"



import { useNavigate } from "react-router-dom"
import useAuth from "@/hooks/use-auth"
import useCart from "@/hooks/use-cart"
import CheckoutItem from "@/components/checkout-item"
import { Product } from "@/types/product-type"
import ShopCartItem from "@/types/shop-cart-item"
import { makeOrder } from "@/lookup"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const Checkout = ()=>{
    const {items,setItems,addItem,removeItem,setItemQuantity,clearCart} = useCart()
    const [error,setError] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const {user} = useAuth()
    const navigate = useNavigate()


    const handleMakerOrder = ()=>{
        if(!user){
            navigate("/auth/login")
        }
        setError("")
        setIsLoading(true)
        makeOrder(items).then((response)=>{
            if(response.status >= 400){
                setError(response.body.error.message[0].message)
            }else{
                console.log("order success")
                clearCart()
            }
            setIsLoading(false)
        })
    }

    const handleQuantityChange = (product:Product,newQuantity:number)=>{
        const quantity:number = Math.floor(newQuantity)
        if(quantity){
            setItemQuantity({
                product:product,
                quantity:quantity
            })
        }
    }

    const handleRemoveItem = (cartItem:ShopCartItem)=>{
        removeItem(cartItem)
    }

  return (
    <div className="container mx-auto py-10">
        <Button disabled={isLoading} onClick={(e)=>{handleMakerOrder()}} className="mb-4">
            Make Order
        </Button>
        {(error.length > 0) ? (
            <p>
                {error}
            </p>
        ) : ""}
        <Table className="table table-bordered">
        <TableHeader className="thead-dark">
        <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Remove</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
         {items.map((cartItem) => (
                           <CheckoutItem
                                cartItem={cartItem}
                                onQuantityChange={(quantity)=>{handleQuantityChange(cartItem.product,quantity)}}
                                onItemRemove={()=>{handleRemoveItem(cartItem)}}
                           />
                    ))}
                    </TableBody>
                    </Table>
  </div>
  )
}

export default Checkout;