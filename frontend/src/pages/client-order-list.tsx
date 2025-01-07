import React, {useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import useUserOrders from '@/hooks/use-user-orders';
import { OrderStatus } from '@/types/order-type';



const ClientOrderList: React.FC = () => {
    const [orders,isOrdersLoading,isOrdersError] = useUserOrders()
 
    if((isOrdersLoading)||(isOrdersError)){
        return (<p>Loading</p>)
    }

    return (
        <div className="container mt-5 mx-8">
            <div className='w-1/2 mx-*'>
                {orders?.map((order)=>(
                    <div>

                        <p>
                            {order.id}
                        </p>
                        <p>
                            {OrderStatus[order.OrderStatusId].toLowerCase()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientOrderList;