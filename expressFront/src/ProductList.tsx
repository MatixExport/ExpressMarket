import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    weight: string;
    createdAt: string;
    updatedAt: string;
    CategoryId: number;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [nameFilter, setNameFilter] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<number>(0);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/products/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.data);

                const responseCategories = await fetch('http://localhost:3000/categories/');
                if (!responseCategories.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const dataCategories = await responseCategories.json();
                setCategories(dataCategories.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Product List</h2>

            <label htmlFor="nameFilter">Name Filter:</label>
            <input id="nameFilter" className="form-control mb-3" onChange={(e) => setNameFilter(e.target.value)}/>

            <label htmlFor="categoryFilter">Category Filter:</label>
            <select
                id="categoryFilter"
                name="categoryFilter"
                className="form-control mb-4"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(Number(e.target.value))}
            >
                <option value={0} disabled>Select a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <button
                className="btn btn-primary mb-3"
                onClick={() => {setCategoryFilter(0); setNameFilter("")}}
            >Reset filters</button>


            <table className="table table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Category</th>
                    <th>Buy</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
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
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.weight}</td>
                            <td>{categories[product.CategoryId].name}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => {
                                    console.log(product)
                                }}>Buy
                                </button>
                            </td>
                            <td>
                                <Link to={`/editProduct/${product.id}`} className="btn btn-primary">Edit</Link>
                                {/*<button  onClick={() => {*/}
                                {/*    console.log(product)*/}
                                {/*}}>*/}
                                {/*</button>*/}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;