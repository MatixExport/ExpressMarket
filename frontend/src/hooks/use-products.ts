import { fetchProducts } from "../lookup"
import useQuery from "./use-query"
import { Product } from "../types/product-type"


const useProducts = ()=>{
   return useQuery<Product[]>(fetchProducts)
}

export default useProducts;