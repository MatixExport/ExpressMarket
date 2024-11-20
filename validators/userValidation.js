const { addValidator } = require('./validation');
const { validateUser,validateUpdateUser } = require('./userValidation.schema');

const addUserValidator = async (req,res, next) => {
    await addValidator(validateUser,req,res,next);
};

const updateUserValidator = async (req,res, next) => {
    await addValidator(validateUpdateUser,req,res,next);
};

module.exports = {addUserValidator,updateUserValidator};