const { addValidator } = require('./validation');
const { validateProduct } = require('./productValidation.schema')

const addProductValidator = async (req,res, next) => {
    await addValidator(validateProduct,req,res,next);
};

module.exports = {addProductValidator}