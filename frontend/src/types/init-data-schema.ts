import { z, ZodType } from "zod"; // Add new import
import { InitProductSchema } from "./product-schema";
import { InitProduct, Product } from "./product-type";

export interface InitDataType{
    Products:InitProduct[]
}



const InitSchema: ZodType<InitDataType> = z
 .object({
    Products:
        z.array(InitProductSchema)
 });

 export default InitSchema