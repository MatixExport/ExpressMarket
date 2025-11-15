import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, UpdateProduct } from "../types/product-type";
import useProductCategories from "@/hooks/use-product-categories.ts";
import { fetchGroqDescription, fetchProduct, updateProduct } from "@/lookup";
import ProductSchema from "@/types/product-schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import FormFieldRender from "@/components/form-field-render.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { Bot, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

const EditProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [categories, isCategoriesLoading, isCategoriesError] = useProductCategories();
    const [isProductLoading, setIsProductLoading] = useState(true);
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; content: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuggesting, setIsSuggesting] = useState(false);

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (id) {
            setIsProductLoading(true);
            fetchProduct(id).then((result) => {
                if (result.status >= 400) {
                    setFormMessage({ type: 'error', content: result.body.error.message[0] });
                } else {
                    const { createdAt, updatedAt, ...filteredProduct } = result.body.data as Product;
                    form.reset(filteredProduct as UpdateProduct);
                }
            }).finally(() => {
                setIsProductLoading(false);
            });
        }
    }, [id, form.reset]);

    const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
        setIsSubmitting(true);
        setFormMessage(null);
        updateProduct(values).then((result) => {
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
                setFormMessage({ type: 'success', content: 'Product updated successfully!' });
            }
        }).finally(() => {
            setIsSubmitting(false);
        });
    };

    const getGroqDescription = () => {
        if (!id) return;
        setIsSuggesting(true);
        fetchGroqDescription(id).then((result) => {
            if (result.status >= 400) {
                setFormMessage({ type: 'error', content: result.body.error.message[0] });
            } else {
                form.setValue('description', result.body.data, { shouldValidate: true });
            }
        }).finally(() => {
            setIsSuggesting(false);
        });
    };

    if (isProductLoading || isCategoriesLoading) {
        return (
            <div className="container mx-auto p-4 flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isCategoriesError) {
        return <Alert variant="destructive"><AlertCircle className="h-4 w-4" /> <AlertTitle>Error</AlertTitle> <AlertDescription>Could not load product categories.</AlertDescription></Alert>;
    }

    return (
        <div className="container mx-auto p-4 flex justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Edit Product</CardTitle>
                    <CardDescription>Update the details for the product below.</CardDescription>
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
                            <FormField name="name" control={form.control} render={({ field }) => (<FormFieldRender label="Name" type="text" field={field} placeholder="Product Name" />)} />
                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>Description</FormLabel>
                                            <Button type="button" variant="outline" size="sm" onClick={getGroqDescription} disabled={isSuggesting}>
                                                {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                                                Suggest with AI
                                            </Button>
                                        </div>
                                        <FormControl>
                                            <Textarea placeholder="Detailed product description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField name="price" control={form.control} render={({ field }) => (<FormFieldRender label="Price ($)" type="number" field={field} placeholder="e.g., 19.99" />)} />
                                <FormField name="weight" control={form.control} render={({ field }) => (<FormFieldRender label="Weight (g)" type="number" field={field} placeholder="e.g., 500" />)} />
                            </div>
                            <FormField
                                name="CategoryId"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories?.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update Product
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProductForm;