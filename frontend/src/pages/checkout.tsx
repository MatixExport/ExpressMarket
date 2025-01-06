
import {
Table,
TableBody,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"




import useCart from "@/hooks/use-cart"
import CheckoutItem from "@/components/checkout-item"
import { Product } from "@/types/product-type"
import ShopCartItem from "@/types/shop-cart-item"

const Checkout = ()=>{
    const {items,setItems,addItem,removeItem,setItemQuantity,clearCart} = useCart()


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