import { fetchUserOrders} from "../lookup"
import useQuery from "./use-query"
import { Order } from "@/types/order-type"


const useUserOrders = ()=>{
   return useQuery<Order[]>(fetchUserOrders)
}

export default useUserOrders;