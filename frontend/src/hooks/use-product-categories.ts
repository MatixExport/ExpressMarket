import { fetchProductCategories } from "../lookup"
import useQuery from "./use-query"
import { ProductCategory } from "../types/product-category-type"


const useProductCategories = ()=>{
   return useQuery<ProductCategory[]>(fetchProductCategories)
}

export default useProductCategories;


