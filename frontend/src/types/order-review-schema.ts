import { z, ZodType } from "zod"; // Add new import


export interface CreateOrderReview{
    rating:number;
    review?:string;
}

const CreateReviewSchema: ZodType<CreateOrderReview> = z
 .object({
    rating:
        z.coerce.number()
        .min(1)
        .max(5),
    review:
        z.string()
        .min(0)
        .optional()
 });

 export default CreateReviewSchema