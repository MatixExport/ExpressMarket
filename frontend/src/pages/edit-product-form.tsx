import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from "react-router-dom";
import {Product} from "../types/product-type"

const EditProductForm: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product>();

    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async ()=>{
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data.data);
            } catch (error: any) {
                setError(error.message);
            }
        }


        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/categories/');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data.data); // Assuming the API response has a data field
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchCategories();
        fetchProduct();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setMessage(null);


        try {
            const response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            setMessage('Product updated successfully!');
        } catch (error: any) {
            setError(error.message);
        }
    };

    if(product === undefined){
        return <div>Loading...</div>;
    }

    if (error) {
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
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
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
                        onChange={(e) => setProduct({ ...product, weight: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="categoryId">Category</label>
                    <select
                        id="categoryId"
                        className="form-control"
                        value={product.CategoryId}
                        onChange={(e) => setProduct({ ...product, CategoryId: parseInt(e.target.value) })}
                        required
                    >
                        <option value={0} disabled>Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
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