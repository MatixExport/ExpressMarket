const { addValidator } = require('./validation');
const { validateOrder} = require('./orderValidation.schema');

const addOrderValidator = async (req,res, next) => {
    await addValidator(validateOrder,req,res,next);
};

module.exports = {addOrderValidator}