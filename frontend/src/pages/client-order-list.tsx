import React, { useEffect, useState } from 'react';
import { Order, OrderReview, OrderStatus } from '@/types/order-type';
import UserOrder from '@/components/user-order';
import { fetchUserOrders, confirmOrder, cancelOrder } from '@/lookup';
import { Response } from '@/types/response-type';
import { Skeleton } from '@/components/ui/skeleton';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientOrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetchUserOrders().then((response: Response) => {
            if (response.status < 400) {
                setOrders(response.body.data);
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleCancelOrder = (id: number) => {
        cancelOrder(id).then(() => {
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === id ? { ...order, OrderStatusId: OrderStatus.CANCELED } : order
            ));
        });
    };

    const handleAddReview = (id: number, review: OrderReview) => {
        setOrders(prevOrders => prevOrders.map(order =>
            order.id === id ? { ...order, OrderReview: review } : order
        ));
    };

    const handleConfirmOrder = (id: number) => {
        confirmOrder(id).then(() => {
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === id ? { ...order, OrderStatusId: OrderStatus.COMPLETED, confirmDate: new Date().toISOString() } : order
            ));
        });
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <div className="space-y-2 mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
                    <p className="text-muted-foreground">Loading your order history...</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-10 w-24" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="space-y-2 mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Your Orders</h1>
                <p className="text-muted-foreground">Here is a list of all your past and current orders.</p>
            </div>

            {orders.length === 0 ? (
                <Card className="w-full text-center">
                    <CardHeader>
                        <CardTitle>No Orders Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">You haven't placed any orders yet.</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => navigate('/')}>
                            Start Shopping
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <UserOrder
                            key={order.id}
                            order={order}
                            onAddReview={(review: OrderReview) => { handleAddReview(order.id, review) }}
                            onCancel={() => { handleCancelOrder(order.id) }}
                            onConfirm={() => handleConfirmOrder(order.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientOrderList;