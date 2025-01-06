import { z, ZodType } from "zod";
import {UpdateProduct} from "@/types/product-type.ts"; // Add new import


const UpdateProductSchema: ZodType<UpdateProduct> = z
    .object({
        id:
            z.number()
                .int(),
        name:
            z.string()
                .min(4)
                .max(40),
        description:
            z.string()
                .min(8)
                .max(500),
        price:
            z.coerce.number()
                .min(0),
        weight:
            z.coerce.number()
                .min(0.1)
                .max(5000),
        CategoryId:
            z.coerce.number()
                .min(1)
                .max(5)
                .int()

    });

export default UpdateProductSchema



