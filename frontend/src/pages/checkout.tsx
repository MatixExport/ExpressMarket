
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
import ConfirmDialog from "@/components/confirm-dialog"

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
                navigate("/orders/user")
            }
            setIsLoading(false)
        })
    }

    const handleQuantityChange = (product:Product,newQuantity:number)=>{
        const quantity:number = Math.floor(newQuantity)
        if(quantity&&quantity>0){
            setItemQuantity({
                product:product,
                quantity:quantity
            })
        }
    }

    const handleRemoveItem = (cartItem:ShopCartItem)=>{
        removeItem(cartItem)
    }

    if(items.length == 0){
        return (
            <div className="container mx-auto py-10">
                <h2>
                    Your shopping cart is currently empty!
                </h2>
            </div>
        )
    }

  return (
    <div className="container mx-auto py-10">
        <ConfirmDialog
        title="Confirm order"
        text="After confirmation you will need to wait for the order approval."
        onConfirm={()=>{handleMakerOrder()}}
        >
        <Button disabled={isLoading} className="mb-4">
            Make Order
        </Button>
        </ConfirmDialog>
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