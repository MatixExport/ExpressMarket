const { addValidator } = require('./validation');
const { validateAddProduct,validateUpdateProduct,validateBulkAddProduct } = require('./productValidation.schema')

const addProductValidator = async (req,res, next) => {
    await addValidator(validateAddProduct,req,res,next);
};
const addBulkProductValidator = async (req,res, next) => {
    await addValidator(validateBulkAddProduct,req,res,next);
};
const updateProductValidator = async (req,res, next) => {
    await addValidator(validateUpdateProduct,req,res,next);
};

module.exports = {addProductValidator,updateProductValidator,addBulkProductValidator}