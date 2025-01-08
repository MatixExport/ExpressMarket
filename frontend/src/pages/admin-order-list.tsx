import React, {useEffect, useState } from 'react';

import { Order, OrderProduct, OrderReview, OrderStatus } from '@/types/order-type';
import UserOrder from '@/components/user-order';
import { fetchUserOrders, getOrders, updateOrderStatus } from '@/lookup';
import { Response } from '@/types/response-type';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import UserOrderProducts from '@/components/user-order-products';
import UserReview from '@/components/user-review';
import SetOrderStatusDialog from '@/components/set-order-status-dialog';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import ConfirmDialog from '@/components/confirm-dialog';
import { Check } from 'lucide-react';


const AdminOrderList: React.FC = () => {
    const [orders,setOrders] = useState<Order[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [status,setStatus] = useState<number>(0)
 
    useEffect(()=>{
        setIsLoading(true)
        getOrders().then((response:Response)=>{
            if(response.status >= 400){
                console.log(response.body.error)
            }else{
                setOrders(response.body.data)
            }
            setIsLoading(false)
        })
    },[])

    const handleChangeOrderStatus = (id:number,statusId:number)=>{
        const newOrders = orders.map((order)=>{
            if(order.id === id){
                order.OrderStatusId = statusId
            }
            return order
        })
        setOrders(newOrders)
        updateOrderStatus(id,statusId)
    }

   
    if(isLoading){
        return("Loading")
    }    


    return (
        <div>
        <div className='w-1/2 mx-* border mx-auto rounded p-4'>
                <Label htmlFor="statusFilter" className='mb-8'>Status Filter:</Label>
                <Select 
                    onValueChange={(value) => setStatus(Number(value))} 
                    defaultValue={status?.toString()} 
                    value={status.toString()}
                    name="statusFilter"
                >
                <SelectTrigger className="form-control mb-4">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0" disabled>Select status</SelectItem>
                    {Object.keys(OrderStatus).filter((status)=>isNaN(Number(status))).map((status) => (
                    <SelectItem key={OrderStatus[status as keyof typeof OrderStatus].toString()} value={OrderStatus[status as keyof typeof OrderStatus].toString()}>
                        {status.toLowerCase()}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>

                <Button
                    className="btn btn-primary mb-3"
                    onClick={() => {setStatus(0)}}
                >
                    Reset filters
                </Button>
            </div>
            
        <div className="p-6">
            <Table className="table table-bordered transition-all">
                <TableHeader className="thead-dark transition-all">
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confirm Date</TableHead>
                    <TableHead>User Id</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {
                    orders
                    .filter((order)=>{
                        return status === 0 || order.OrderStatusId === status
                    })
                    .map((order:Order) => (
                        <TableRow key={order.id} >
                            <TableCell >{order.id}</TableCell>
                            <TableCell >
                       
                                <Badge className='mr-2'>
                                    {OrderStatus[order.OrderStatusId].toLowerCase()}
                                </Badge>
                           
                                <SetOrderStatusDialog
                                    defaultValue={order.OrderStatusId}
                                    onDialogSubmit={(statusId:number)=>{handleChangeOrderStatus(order.id,statusId)}}
                                />
                           
                            </TableCell>
                            <TableCell>
                                {order.confirmDate ? new Date(order.confirmDate).toLocaleString() : "Not confirmed"}
                            </TableCell>
                            <TableCell>
                                {order.UserId}
                            </TableCell>
                            <TableCell>
                                <UserOrderProducts products={order.Products}/>
                            </TableCell>
                            <TableCell >
                                {order.OrderReview ? (<UserReview review={order.OrderReview} />) : ("No review")}
                            </TableCell>
                            <TableCell>
                                {order.OrderStatusId === OrderStatus.UNAPPROVED && <ConfirmDialog
                                    title='Approve order'
                                    text={`Do you want to approve Order#${order.id}`}
                                    onConfirm={()=>{handleChangeOrderStatus(order.id,OrderStatus.APPROVED)}}
                                >
                                    <Button variant="outline" className='h-8 w-4'>
                                        <Check/>
                                    </Button>
                                </ConfirmDialog>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        </div>
      );
};

export default AdminOrderList;