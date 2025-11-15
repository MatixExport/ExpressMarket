import React, { useEffect, useState } from 'react';
import { Order, OrderStatus } from '@/types/order-type';
import { getOrders, updateOrderStatus } from '@/lookup';
import { Response } from '@/types/response-type';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import UserOrderProducts from '@/components/user-order-products';
import UserReview from '@/components/user-review';
import SetOrderStatusDialog from '@/components/set-order-status-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/confirm-dialog';
import { Check, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cva } from 'class-variance-authority';

const badgeVariants = cva(
    "capitalize",
    {
        variants: {
            status: {
                [OrderStatus.UNAPPROVED]: "bg-yellow-500 hover:bg-yellow-600",
                [OrderStatus.APPROVED]: "bg-blue-500 hover:bg-blue-600",
                [OrderStatus.CANCELED]: "bg-red-500 hover:bg-red-600",
                [OrderStatus.COMPLETED]: "bg-green-500 hover:bg-green-600",
            },
        },
    }
);

const AdminOrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [statusFilter, setStatusFilter] = useState<number>(0);

    useEffect(() => {
        setIsLoading(true);
        getOrders().then((response: Response) => {
            if (response.status < 400) {
                setOrders(response.body.data);
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleChangeOrderStatus = (id: number, statusId: number) => {
        updateOrderStatus(id, statusId).then(() => {
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === id ? { ...order, OrderStatusId: statusId } : order
            ));
        });
    };

    const filteredOrders = orders.filter(order => statusFilter === 0 || order.OrderStatusId === statusFilter);

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
                    <p className="text-muted-foreground">Filter and manage all customer orders.</p>
                </div>
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
                <p className="text-muted-foreground">Filter and manage all customer orders.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filter Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="max-w-sm space-y-2">
                        <Label htmlFor="statusFilter">Filter by Status:</Label>
                        <Select
                            onValueChange={(value) => setStatusFilter(Number(value))}
                            value={statusFilter.toString()}
                            name="statusFilter"
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">All Statuses</SelectItem>
                                {Object.keys(OrderStatus)
                                    .filter((status) => isNaN(Number(status)))
                                    .map((status) => (
                                        <SelectItem key={status} value={OrderStatus[status as keyof typeof OrderStatus].toString()}>
                                            {status.charAt(0) + status.slice(1).toLowerCase()}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={() => setStatusFilter(0)}>Reset Filter</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Confirm Date</TableHead>
                                    <TableHead>User ID</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Review</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order: Order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Badge className={badgeVariants({ status: order.OrderStatusId })}>
                                                        {OrderStatus[order.OrderStatusId].toLowerCase()}
                                                    </Badge>
                                                    <SetOrderStatusDialog
                                                        defaultValue={order.OrderStatusId}
                                                        onDialogSubmit={(statusId: number) => { handleChangeOrderStatus(order.id, statusId) }}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {order.confirmDate ? new Date(order.confirmDate).toLocaleString() : "Not confirmed"}
                                            </TableCell>
                                            <TableCell>{order.UserId}</TableCell>
                                            <TableCell>
                                                <UserOrderProducts products={order.Products} />
                                            </TableCell>
                                            <TableCell>
                                                {order.OrderReview ? <UserReview review={order.OrderReview} /> : "No review"}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {order.OrderStatusId === OrderStatus.UNAPPROVED && (
                                                    <ConfirmDialog
                                                        title='Approve Order'
                                                        text={`Do you want to approve Order #${order.id}?`}
                                                        onConfirm={() => { handleChangeOrderStatus(order.id, OrderStatus.APPROVED) }}
                                                    >
                                                        <Button variant="ghost" size="icon">
                                                            <Check className="h-4 w-4 text-green-500" />
                                                        </Button>
                                                    </ConfirmDialog>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center h-24">
                                            No orders found for the selected filter.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminOrderList;