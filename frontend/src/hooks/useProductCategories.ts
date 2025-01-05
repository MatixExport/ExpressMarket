import { fetchProductCategories } from "../lookup"
import useQuery from "./useQuery"
import { ProductCategory } from "../types/ProductCategoryType"


const useProductCategories = ()=>{
   return useQuery<ProductCategory>(fetchProductCategories)
}

export default useProductCategories;


