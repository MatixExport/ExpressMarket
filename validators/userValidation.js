const { addValidator } = require('./validation');
const { validateUser } = require('./userValidation.schema');

export const addUserValidator = async (req,res, next) => {
    await addValidator(validateUser,req,res,next);
};