import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProduct } from "@/lookup";
import useProductCategories from "@/hooks/use-product-categories.ts";
import ProductSchema from "@/types/product-schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import FormFieldRender from "@/components/form-field-render.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

const AddProductForm: React.FC = () => {
    const [categories, isCategoriesLoading, isCategoriesError] = useProductCategories();
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; content: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            weight: 0,
            CategoryId: 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
        setIsSubmitting(true);
        setFormMessage(null);

        addProduct(values).then((result) => {
            if (result.status >= 400) {
                const messages: [{ message: string, field: string }] = result.body.error.message;
                let globalError = '';
                messages.forEach(({ field, message }) => {
                    if (field === "global") {
                        globalError += message + ' ';
                    } else {
                        form.setError(field as keyof z.infer<typeof ProductSchema>, { type: "server", message: message });
                    }
                });
                if (globalError) {
                    setFormMessage({ type: 'error', content: globalError.trim() });
                }
            } else {
                setFormMessage({ type: 'success', content: 'Product added successfully!' });
                form.reset();
            }
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    if (isCategoriesLoading) {
        return (
            <div className="container mx-auto p-4 flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isCategoriesError) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Could not load product categories. Please try again later.</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="container mx-auto p-4 flex justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Add a New Product</CardTitle>
                    <CardDescription>Fill out the form below to add a new product to the catalog.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {formMessage && (
                                <Alert variant={formMessage.type === 'success' ? 'default' : 'destructive'}>
                                    {formMessage.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    <AlertTitle>{formMessage.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                                    <AlertDescription>{formMessage.content}</AlertDescription>
                                </Alert>
                            )}
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormFieldRender label="Name" type="text" field={field} placeholder="Product Name" />
                                )}
                            />
                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Detailed product description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    name="price"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormFieldRender label="Price ($)" type="number" field={field} placeholder="e.g., 19.99" />
                                    )}
                                />
                                <FormField
                                    name="weight"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormFieldRender label="Weight (g)" type="number" field={field} placeholder="e.g., 500" />
                                    )}
                                />
                            </div>
                            <FormField
                                name="CategoryId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories?.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Add Product
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProductForm;