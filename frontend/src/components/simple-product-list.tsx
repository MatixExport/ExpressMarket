import React from 'react';
import ShopCartItem from '@/types/shop-cart-item';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
    TableCaption
  } from "@/components/ui/table"

  import { useMemo } from 'react';

interface SimpleProductListProps{
    items:ShopCartItem[]
}


const SimpleProductList: React.FC<SimpleProductListProps> = ({items}) => {

    const itemPriceSum = useMemo(()=>{
        return items.reduce<number>((accumulator, item: ShopCartItem) => {
            return accumulator + (item.quantity * item.product.price);
          }, 0);
      },[items])


    return (
        <Table>
            <TableCaption>Your shop cart.</TableCaption>
            <TableHeader>
                <TableHead>
                    Name
                </TableHead>
                <TableHead>
                    Price
                </TableHead>
                <TableHead>
                    Quantity
                </TableHead>
            </TableHeader>
            <TableBody>
            {
                items.map((item)=>(
                    <TableRow key={item.product.id}>
                        <TableCell>
                            {item.product.name}
                        </TableCell>
                        <TableCell>
                            {item.product.price}$
                        </TableCell>
                        <TableCell>
                            {item.quantity}
                        </TableCell>
                    </TableRow>
                ))

            }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">{itemPriceSum.toFixed(2)}$</TableCell>
                </TableRow>
            </TableFooter>



        </Table>
    );
};

export default SimpleProductList;