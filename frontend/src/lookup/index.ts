import { fetchBackendLookup,tokenFetchBackendLookup } from "./backend-lookup";


export const login = async(login:string,password:string)=>{
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

export const fetchProductCategories = async ()=>{
    const endpoint:string = "/categories/"
    return await fetchBackendLookup("GET",endpoint)
}
