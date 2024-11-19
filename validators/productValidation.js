import { addValidator } from './validation';
import { validateProduct } from './productValidation.schema';

export const addProductValidator = async (req,res, next) => {
    await addValidator(validateProduct,req,res,next);
};