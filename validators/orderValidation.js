import { addValidator } from './validation';
import { validateOrder} from './orderValidation.schema';

export const addUserValidator = async (req,res, next) => {
    await addValidator(validateOrder,req,res,next);
};