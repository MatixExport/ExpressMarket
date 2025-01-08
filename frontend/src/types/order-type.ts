



export enum OrderStatus {
    UNAPPROVED = 1,
    APPROVED = 2,
    CANCELED = 3,
    COMPLETED = 4
  }



export interface OrderReview{
    id: number;
    rating:number;
    review:string;
    createdAt: string;
    updatedAt: string;
}


export interface OrderUnit{
    quantity:number;
    OrderId:number;
    ProductId:number;
    createdAt: string;
    updatedAt: string;

}

export interface OrderProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    weight: number;
    createdAt: string;
    updatedAt: string;
    CategoryId: number;
    OrderUnit:OrderUnit
}

export interface Order {
    id: number;
    confirmDate: string | null;
    UserId: number;
    OrderStatusId: OrderStatus;
    Products: OrderProduct[];
    OrderReview: OrderReview | null;
    createdAt: string;
    updatedAt: string;
}

