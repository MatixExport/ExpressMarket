import React, { useMemo } from 'react';
import { OrderProduct } from '@/types/order-type';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown } from 'lucide-react';

interface UserOrderProductsProps {
    products: OrderProduct[]
}

const UserOrderProducts: React.FC<UserOrderProductsProps> = ({ products }) => {

    const orderPrice = useMemo(() => {
        return products.reduce<number>((accumulator, item: OrderProduct) => {
            return accumulator + (Number(item.price) * item.OrderUnit.quantity);
        }, 0);
    }, [products]);

    return (
        <Collapsible className="group/collapsible transition-all">
            <CollapsibleTrigger className='flex items-center justify-between w-full p-2 rounded-md hover:bg-accent'>
                <span className="font-semibold">View Products ({products.length})</span>
                <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="px-2 pt-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-center">Qty</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product: OrderProduct) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="text-center">{product.OrderUnit.quantity}</TableCell>
                                    <TableCell className="text-right">${(Number(product.price) * product.OrderUnit.quantity).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2} className="text-right font-bold">Total</TableCell>
                                <TableCell className="text-right font-bold">${orderPrice.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default UserOrderProducts;