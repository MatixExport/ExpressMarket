const { addValidator } = require('./validation');
const { validateAddOrder,validateUpdateOrder} = require('./orderValidation.schema');

const addOrderValidator = async (req,res, next) => {
    await addValidator(validateAddOrder,req,res,next);
};
const updateOrderValidator = async (req,res, next) => {
    await addValidator(validateUpdateOrder,req,res,next);
};

module.exports = {addOrderValidator,updateOrderValidator}