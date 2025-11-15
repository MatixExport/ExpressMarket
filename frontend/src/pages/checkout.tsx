import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
    TableCell,

} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"
import useAuth from "@/hooks/use-auth"
import useCart from "@/hooks/use-cart"
import CheckoutItem from "@/components/checkout-item"
import { Product } from "@/types/product-type"
import ShopCartItem from "@/types/shop-cart-item"
import { makeOrder } from "@/lookup"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import ConfirmDialog from "@/components/confirm-dialog"
import { Loader2, AlertCircle, ShoppingCart } from "lucide-react"

const Checkout = () => {
    const { items, setItemQuantity, removeItem, clearCart } = useCart()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth()
    const navigate = useNavigate()

    const totalPrice = useMemo(() => {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [items]);

    const handleMakeOrder = () => {
        if (!user) {
            navigate("/auth/login")
            return;
        }
        setError("")
        setIsLoading(true)
        makeOrder(items).then((response) => {
            if (response.status >= 400) {
                setError(response.body.error.message[0].message)
            } else {
                clearCart()
                navigate("/orders/user")
            }
        }).finally(() => {
            setIsLoading(false)
        });
    }

    const handleQuantityChange = (product: Product, newQuantity: number) => {
        const quantity: number = Math.floor(newQuantity)
        if (quantity && quantity > 0) {
            setItemQuantity({
                product: product,
                quantity: quantity
            })
        }
    }

    const handleRemoveItem = (cartItem: ShopCartItem) => {
        removeItem(cartItem)
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto py-10 flex justify-center">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <CardTitle>Your Cart is Empty</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => navigate('/')}>
                            Start Shopping
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Shopping Cart</CardTitle>
                    <CardDescription>Review the items in your cart before proceeding to order.</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Weight</TableHead>
                                    <TableHead className="text-center">Quantity</TableHead>
                                    <TableHead className="text-center">Remove</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((cartItem) => (
                                    <CheckoutItem
                                        key={cartItem.product.id}
                                        cartItem={cartItem}
                                        onQuantityChange={(quantity) => { handleQuantityChange(cartItem.product, quantity) }}
                                        onItemRemove={() => { handleRemoveItem(cartItem) }}
                                    />
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={5} className="text-right font-bold">Total</TableCell>
                                    <TableCell className="text-right font-bold">${totalPrice.toFixed(2)}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <ConfirmDialog
                        title="Confirm Order"
                        text="After confirmation, you will need to wait for the order approval."
                        onConfirm={handleMakeOrder}
                    >
                        <Button disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Make Order
                        </Button>
                    </ConfirmDialog>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Checkout;