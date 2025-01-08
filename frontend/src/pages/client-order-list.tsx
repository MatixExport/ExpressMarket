import React, {useEffect, useState } from 'react';

import { Order, OrderProduct, OrderReview, OrderStatus } from '@/types/order-type';
import UserOrder from '@/components/user-order';
import { fetchUserOrders } from '@/lookup';
import { Response } from '@/types/response-type';
import { confirmOrder,cancelOrder } from '@/lookup';


const ClientOrderList: React.FC = () => {
    const [orders,setOrders] = useState<Order[]>([])
    const [isLoading,setIsLoading] = useState<boolean>(true)
 
    useEffect(()=>{
        setIsLoading(true)
        fetchUserOrders().then((response:Response)=>{
            if(response.status >= 400){

            }else{
                setOrders(response.body.data)
            }
            setIsLoading(false)
        })
    },[])

    const handleCancelOrder = (id:number)=>{
        const newOrders = orders.map((order)=>{
            if(order.id === id){
                order.OrderStatusId = OrderStatus.CANCELED
            }
            return order
        })
        setOrders(newOrders)
        cancelOrder(id)

    }

    const handleAddReview = (id:number,review:OrderReview)=>{
        setOrders(orders.map((order:Order)=>{
            if(order.id === id){
                order.OrderReview = review
            }
            return order
        }))
    }

    const handleConfirmOrder = (id:number)=>{
        const newOrders = orders.map((order)=>{
            if(order.id === id){
                order.OrderStatusId = OrderStatus.COMPLETED
            }
            return order
        })
        setOrders(newOrders)
        confirmOrder(id)

    }

    if(!orders || isLoading){
        return("Loading")
    }


    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {
                orders.map((order)=>(
                    <UserOrder
                    order={order}
                    onAddReview={(review:OrderReview)=>{handleAddReview(order.id,review)}}
                    onCancel={()=>{handleCancelOrder(order.id)}}
                    onConfirm={()=>handleConfirmOrder(order.id)}
                    />
                ))
            }
        </div>
      );
};

export default ClientOrderList;