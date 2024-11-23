const { addValidator } = require('./validation');
const { validateOrderReview} = require('./orderReviewValidation.schema')

const addOrderReviewValidator = async (req,res, next) => {
    await addValidator(validateOrderReview,req,res,next);
};

module.exports = {addOrderReviewValidator}