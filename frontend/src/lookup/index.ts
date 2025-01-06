import ShopCartItem from "@/types/shop-cart-item";
import { fetchBackendLookup,tokenFetchBackendLookup } from "./backend-lookup";
import {UpdateProduct} from "@/types/product-type.ts";


export const requestLogin = async(login:string,password:string)=>{
    const endpoint:string = "/auth/login";
    return await fetchBackendLookup("POST",endpoint,{
        login:login,
        password:password
    })
}

export const register = async(login:string,password:string,email:string)=>{
    const endpoint:string = "/auth/register";
    return await fetchBackendLookup("POST",endpoint,{
        login:login,
        password:password,
        email:email
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
