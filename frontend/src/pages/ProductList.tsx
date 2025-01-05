import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Label } from "@/components/ui/label"
import { PenBox, ShoppingBasket } from "lucide-react"
import {
Select,
SelectContent,
SelectGroup,
SelectItem,
SelectLabel,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"

import { Button } from '@/components/ui/button';

import { Input } from "@/components/ui/input"
import {Link} from "react-router-dom";
import useProducts from '../hooks/useProducts';
import useProductCategories from '../hooks/useProductCategories';


const ProductList: React.FC = () => {
    const [products,isProductsLoading,isProductsError] = useProducts()
    const [categories,isCategoriesLoading,isCategoriesError] = useProductCategories()
    const [nameFilter, setNameFilter] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<number>(0);
 

    if ((isCategoriesLoading)||(isProductsLoading)) {
        return <div>Loading...</div>;
    }

    if ((isProductsError)||(isCategoriesError)) {
        return <div>Error</div>;
    }

    return (
        <div className="container mt-5 mx-8">
            <div className='w-1/2 mx-*'>
                <Label htmlFor="nameFilter" className='mb-8'>Name Filter:</Label>
                <Input id="nameFilter" className="form-control mb-3" onChange={(e) => setNameFilter(e.target.value)}/>

                <Label htmlFor="categoryFilter" className='mb-8'>Category Filter:</Label>
                <Select 
                    onValueChange={(value) => setCategoryFilter(Number(value))} 
                    defaultValue={categoryFilter.toString()} 
                    name="categoryFilter"
                >
                <SelectTrigger className="form-control mb-4">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0" disabled>Select a category</SelectItem>
                    {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>

                <Button
                    className="btn btn-primary mb-3"
                    onClick={() => {setCategoryFilter(0); setNameFilter("")}}
                >
                    Reset filters
                </Button>
            </div>
            


            <Table className="table table-bordered">
                <TableHeader className="thead-dark">
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Buy</TableHead>
                    <TableHead>Edit</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {products
                    .filter((product) => {
                        return product.name.includes(nameFilter)
                    })
                    .filter((product) => {
                            if (categoryFilter === 0) {
                                return product;
                            } else return product.CategoryId === categoryFilter;
                        }
                    )
                    .map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.weight}</TableCell>
                            <TableCell>{categories[product.CategoryId-1].name}</TableCell>
                            <TableCell>
                            <Button variant="outline" size="icon" onClick={() => {
                                    console.log(product)
                                }}>
                                <ShoppingBasket />
                            </Button>
                            </TableCell>
                            <TableCell>
                           
                                <Link to={`/editProduct/${product.id}`} className="btn btn-primary">
                                    <Button variant="outline" size="icon">
                                        <PenBox />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ProductList;