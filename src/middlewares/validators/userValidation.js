const { addValidator } = require('./validation');
const { validateUser,validateUpdateUser,validateLoginUser } = require('./userValidation.schema');

const addUserValidator = async (req,res, next) => {
    await addValidator(validateUser,req,res,next);
};

const updateUserValidator = async (req,res, next) => {
    await addValidator(validateUpdateUser,req,res,next);
};

const validateLogin = async (req,res,next) =>{
    await addValidator(validateLoginUser,req,res,next);
}

module.exports = {addUserValidator,updateUserValidator,validateLogin};