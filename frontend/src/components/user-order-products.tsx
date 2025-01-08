import React, { useMemo } from 'react';
import { OrderProduct, OrderReview } from '@/types/order-type';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronRight, ChevronRightSquare } from 'lucide-react';


interface UserOrderProductsProps{
    products:OrderProduct[]
}

const UserOrderProducts: React.FC<UserOrderProductsProps> = ({products}
    ) => {

    const orderPrice = useMemo(()=>{
        return products.reduce<number>((accumulator, item: OrderProduct) => {
            return accumulator + (item.price * item.OrderUnit.quantity);
            }, 0);
        },[products])


    return (
 <Collapsible className="group/collapsible transition-all">
         <CollapsibleTrigger className='flex '>
            <ChevronRightSquare className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            <span>Products</span>
         </CollapsibleTrigger>
         <CollapsibleContent className="CollapsibleContent">
         <div className="flex justify-center">
             <div className="w-10/12 max-h-56 overflow-y-auto">
                            <ul className="space-y-2 mt-2 flex flex-col justify-center bg-secondary rounded-lg justify-between p-3 border w-full">
                              {products.map((product:OrderProduct) => (
                                <li
                                  key={product.id}
                                  className="flex justify-between items-center text-primary"
                                >
                                  <div className="flex">
                                    <p className="font-semibold mr-2">{product.OrderUnit.quantity}x</p>
                                    <p className="font-semibold mr-2"> {product.name}</p>
                                    <p> {(product.price * product.OrderUnit.quantity).toFixed(2)}$</p>
                                  </div>
                                </li>
                              ))}
                              <p>
                                <div className="flex justify-end">
                                    <p className="font-medium font-extrabold mr-2">Total:</p>
                                    <p className="font-medium font-semibold">${orderPrice.toFixed(2)}</p>
                                </div>
                              </p>
                            </ul>
                          </div>
        </div>
        </CollapsibleContent>
        </Collapsible>
    );
};

export default UserOrderProducts;