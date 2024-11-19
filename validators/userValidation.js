import { addValidator } from './validation';
import { validateUser } from './userValidation.schema';

export const addUserValidator = async (req,res, next) => {
    await addValidator(validateUser,req,res,next);
};