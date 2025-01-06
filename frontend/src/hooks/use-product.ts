import {fetchProduct} from "../lookup"
import useQuery from "./use-query"
import { Product } from "../types/product-type"


const useProduct = (id: string )=>{
    return useQuery<Product>(()=>fetchProduct(id))
}

export default useProduct;