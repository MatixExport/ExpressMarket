import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PenBox, ShoppingBasket } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom";
import useProducts from '../hooks/use-products';
import useProductCategories from '../hooks/use-product-categories';
import useCart from '@/hooks/use-cart';
import useAuth from '@/hooks/use-auth';
import { UserRole } from '@/types/user-type';
import { Skeleton } from '@/components/ui/skeleton';

const ProductList: React.FC = () => {
    const [products, isProductsLoading, isProductsError] = useProducts()
    const [categories, isCategoriesLoading, isCategoriesError] = useProductCategories()
    const [nameFilter, setNameFilter] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<number>(0);
    const { user } = useAuth()
    const { addItem } = useCart()

    if (isCategoriesLoading || isProductsLoading) {
        return (
            <div className="container mx-auto p-4 space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        )
    }

    if (isProductsError || isCategoriesError || !products || !categories) {
        return <div className="container mx-auto p-4">Error loading products or categories.</div>;
    }

    const handleResetFilters = () => {
        setCategoryFilter(0);
        setNameFilter("");
    };

    const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(nameFilter.toLowerCase()))
        .filter(product => categoryFilter === 0 || product.CategoryId === categoryFilter);

    return (
        <div className="container mx-auto p-4 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nameFilter">Name Filter:</Label>
                            <Input id="nameFilter" value={nameFilter} placeholder="Filter by name..." onChange={(e) => setNameFilter(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="categoryFilter">Category Filter:</Label>
                            <Select
                                onValueChange={(value) => setCategoryFilter(Number(value))}
                                value={categoryFilter.toString()}
                                name="categoryFilter"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="outline"
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Weight</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-center">Buy</TableHead>
                                {user?.role === UserRole.EMPLOYEE && (
                                    <TableHead className="text-center">Edit</TableHead>
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="text-right">${Number(product.price).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{product.weight}g</TableCell>
                                    <TableCell>{categories.find(c => c.id === product.CategoryId)?.name || 'N/A'}</TableCell>
                                    <TableCell className="text-center">
                                        <Button variant="outline" size="icon" onClick={() => addItem({ product, quantity: 1 })}>
                                            <ShoppingBasket className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                    {user?.role === UserRole.EMPLOYEE && (
                                        <TableCell className="text-center">
                                            <Link to={`/editProduct/${product.id}`}>
                                                <Button variant="outline" size="icon">
                                                    <PenBox className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductList;