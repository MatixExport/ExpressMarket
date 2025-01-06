import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Product, UpdateProduct} from "../types/product-type"
import useProductCategories from "@/hooks/use-product-categories.ts";
import {fetchProduct, updateProduct} from "@/lookup";

const EditProductForm: React.FC = () => {
    const { id } = useParams<{id: string}>();

    const [categories,isCategoriesLoading,isCategoriesError] = useProductCategories()
    const navigate = useNavigate();
    if(id === undefined || id === null) {
        navigate("/error")
    }
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
                    setError("Backend error")
                }else{
                    const { createdAt, updatedAt, ...filteredProduct } = result.body.data as Product;
                    setProduct(filteredProduct as UpdateProduct);
                }
                setError(null);
            }
        )
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);

        updateProduct(product).then(
            (result) =>{
                if(result.status >= 400 ){
                    console.log(result.body)
                    setError("Backend error")
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


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Product</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight</label>
                    <input
                        type="number"
                        id="weight"
                        className="form-control"
                        value={product.weight}
                        onChange={(e) => setProduct({ ...product, weight: parseFloat(e.target.value) })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryId">Category</label>
                    <select
                        id="categoryId"
                        className="form-control"
                        value={product.CategoryId}
                        onChange={(e) =>{
                            console.log(e.target.value);
                            setProduct({ ...product, CategoryId: parseInt(e.target.value) });}
                        }
                        required
                    >
                        <option value={0} disabled>Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Edit Product</button>
            </form>
        </div>
    );
};

export default EditProductForm;