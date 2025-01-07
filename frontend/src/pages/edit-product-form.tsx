import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Product, UpdateProduct} from "../types/product-type"
import useProductCategories from "@/hooks/use-product-categories.ts";
import {fetchGroqDescription, fetchProduct, updateProduct} from "@/lookup";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import ProductSchema from "@/types/product-schema";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import FormFieldRender from "@/components/form-field-render.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select.tsx";
import {Bot} from "lucide-react";

const EditProductForm: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [categories,isCategoriesLoading,isCategoriesError] = useProductCategories()

    const [product, setProduct] = useState<UpdateProduct>({
        CategoryId: 0,
        description: "",
        id: 0,
        name: "",
        price: 0,
        weight: 0
    })

    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProduct(id as string).then(
            (result) =>{
                if(result.status >= 400){
                    setError(result.body.error.message[0]);
                }else{
                    const { createdAt, updatedAt, ...filteredProduct } = result.body.data as Product;
                    setProduct(filteredProduct as UpdateProduct);
                }
                setError(null);
            }
        )
    }, []);

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        reValidateMode: "onChange",
        defaultValues: {...product},
    })

    useEffect(() => {
        if (product) {
            form.reset(product);
        }
    }, [product, form.reset]);


    const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
        setError(null);
        setMessage(null);

        updateProduct(values).then(
            (result) =>{
                if(result.status >= 400 ){
                    const messages:[{message:string, field:string}] = result.body.error.message;
                    messages.forEach(({field, message})=>{
                        if(field === "global"){
                            setError(message)
                        }
                        else {
                            form.setError(field, {type:"server",message: message})
                        }
                    })
                }
                else {
                    setError(null);
                    setMessage('Product updated successfully!');
                }
            }
        )

    };

    if(isCategoriesLoading){
        return <div>Loading...</div>;
    }

    if (error || isCategoriesError) {
        return <div>Error: {error}</div>;
    }

    if (message){
        return <div>{message}</div>;
    }


    function getGroqDescription() {
        fetchGroqDescription(id as string).then(
            (result) =>{
                if(result.status >= 400){
                    setError(result.body.error.message[0]);
                }else{
                    form.reset({...product, description: result.body.data})
                }
            }
        )
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Update product</CardTitle>
                    <CardDescription>
                        Enter new values for product
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <FormField
                                        name="name"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormFieldRender
                                                label="Name"
                                                type="text"
                                                field={field}
                                                placeholder="Name"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        name="description"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem>
                                                <div className="flex gap-6">
                                                    <FormLabel>Description</FormLabel>
                                                        <Button className="h-5 border-r-0" onClick={() => getGroqDescription()}>
                                                            <Bot></Bot> groq for suggestion <Bot></Bot>
                                                        </Button>
                                                </div>

                                                <FormControl>
                                                    <Textarea placeholder="Description" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <FormField
                                        name="price"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormFieldRender
                                                label="Price"
                                                type="number"
                                                field={field}
                                                placeholder="Price"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        name="weight"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormFieldRender
                                                label="Weight"
                                                type="number"
                                                field={field}
                                                placeholder="Weight"
                                            />
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        name="CategoryId"
                                        control={form.control}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange}
                                                            defaultValue={field.value.toString()}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Category"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="0" disabled>Select a
                                                                category</SelectItem>
                                                            {categories.map((category) => (
                                                                <SelectItem key={category.id}
                                                                            value={category.id.toString()}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>


                                <Button type="submit" className="w-full">
                                    Update product
                                </Button>

                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProductForm;