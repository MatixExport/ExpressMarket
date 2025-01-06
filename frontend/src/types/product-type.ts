export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    weight: number;
    createdAt: string;
    updatedAt: string;
    CategoryId: number;
}

export interface UpdateProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    weight: number;
    CategoryId: number;
}

