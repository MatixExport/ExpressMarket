import ShopCartItem from "@/types/shop-cart-item";
import { fetchBackendLookup,tokenFetchBackendLookup } from "./backend-lookup";
import {InitProduct, UpdateProduct} from "@/types/product-type.ts";
import { InitDataType } from "@/types/init-data-schema";
import { Order, OrderReview } from "@/types/order-type";
import { CreateOrderReview } from "@/types/order-review-schema";


export const requestLogin = async(login:string,password:string)=>{
    const endpoint:string = "/auth/login";
    return await fetchBackendLookup("POST",endpoint,{
        login:login,
        password:password
    })
}

export const register = async(login:string,password:string,email:string,phone:string)=>{
    const endpoint:string = "/auth/register";
    return await fetchBackendLookup("POST",endpoint,{
        login:login,
        password:password,
        email:email,
        phone:phone
    })

}

export const refreshAccessToken = async(refresh:string)=>{
    const endpoint:string = "/auth/refresh";
    return await fetchBackendLookup("POST",endpoint,{
        refresh:refresh
    })

}

export const fetchUserData = async()=>{
    const endpoint:string = "/users/whoami";
    return await tokenFetchBackendLookup("GET",endpoint)
}

export const fetchProducts = async ()=>{
    const endpoint:string = "/products/"
    return await fetchBackendLookup("GET",endpoint)
}

export const fetchProduct = async(id: string) =>{
    const endpoint:string = `/products/${id}`;
    return await fetchBackendLookup("GET",endpoint)
}

export const fetchGroqDescription = async(id: string) =>{
    const endpoint:string = `/products/${id}/seo-description`;
    return await fetchBackendLookup("GET",endpoint)
}

export const fetchProductCategories = async ()=>{
    const endpoint:string = "/categories/"
    return await fetchBackendLookup("GET",endpoint)
}

export const updateProduct = async (product: UpdateProduct) =>{
    const {id, ...data} = {...product}
    const endpoint:string = `/products/${id}`;
    return await tokenFetchBackendLookup("PUT",endpoint, data);
}

export const addProduct = async (product: UpdateProduct) =>{
    const {id, ...data} = {...product}
    const endpoint:string = `/products`;
    return await tokenFetchBackendLookup("POST",endpoint, data);
}

export const makeOrder = async (items:ShopCartItem[])=>{
    const endpoint:string = "/orders"
    const mappedItems = items.map((cartItem)=>{
        return {
            ProductId:cartItem.product.id,
            quantity:cartItem.quantity
        }
    })
    return await tokenFetchBackendLookup("POST",endpoint,
        {
            Products:mappedItems
        }
        
    )
}
export const fetchUserOrders = async ()=>{
    const endpoint:string = "/orders/user"
    return await tokenFetchBackendLookup("GET",endpoint)
}

export const addBulkProducts = async (data : InitDataType)=>{
    const endpoint:string = "/init"
    return await tokenFetchBackendLookup("POST",endpoint,data)
}

export const cancelOrder = async (id:number)=>{
    const endpoint:string = `/orders/${id}/cancel`
    return await tokenFetchBackendLookup("POST",endpoint)
}

export const confirmOrder = async (id:number)=>{
    const endpoint:string = `/orders/${id}/confirm`
    return await tokenFetchBackendLookup("POST",endpoint)
}

export const updateOrderStatus = async (id:number,orderStatusId:number)=>{
    const endpoint:string = `/orders/${id}`
    return await tokenFetchBackendLookup("PUT",endpoint,{
        OrderStatusId:orderStatusId
    })
}

export const addOrderReview = async (id:number,review:CreateOrderReview)=>{
    const endpoint:string = `/orders/${id}/review`
    return await tokenFetchBackendLookup("POST",endpoint,review)
}

export const getOrders = async ()=>{
    const endpoint:string = `/orders`
    return await tokenFetchBackendLookup("GET",endpoint)
}