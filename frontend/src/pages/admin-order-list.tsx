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


const AdminOrderList: React.FC = () => {
    const [orders,setOrders] = useState<Order[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(true)
 
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
        <div className="p-6">
            <Table className="table table-bordered transition-all">
                <TableHeader className="thead-dark transition-all">
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User Id</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {
                    orders.map((order:Order) => (
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
                                {order.UserId}
                            </TableCell>
                            <TableCell>
                                <UserOrderProducts products={order.Products}/>
                            </TableCell>
                            <TableCell >
                                {order.OrderReview ? (<UserReview review={order.OrderReview} />) : ("No review")}
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      );
};

export default AdminOrderList;