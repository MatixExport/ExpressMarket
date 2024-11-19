const {StatusCodes} = require('http-status-codes');




const addValidator = async (validate,req,res, next) => {
    const isValid = validate(req.body);
    if (!isValid && validate.errors) { 
        const error = await validate.errors;
        return res.status(StatusCodes.BAD_REQUEST).json({status: 'errors', code: StatusCodes.BAD_REQUEST,invalid_params:error})
    }
    next(); 
};

module.exports = {addValidator}

