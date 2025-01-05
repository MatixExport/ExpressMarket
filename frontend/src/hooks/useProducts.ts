import { fetchProducts } from "../lookup"
import useQuery from "./useQuery"
import { Product } from "../types/ProductType"


const useProducts = ()=>{
   return useQuery<Product>(fetchProducts)
}

export default useProducts;