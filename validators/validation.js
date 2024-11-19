const {StatusCodes} = require('http-status-codes');


const parseAjvError = (error)=>{
    return {
      params:error.params,
      message:error.message,
      instance:error.instancePath
    }
  }

// (message, code = StatusCodes.BAD_REQUEST, details = {})
const addValidator = async (validate,req,res, next) => {
    const isValid = validate(req.body);
    if (!isValid && validate.errors) { 
        const errors = await validate.errors;
        return res.error(errors.map(parseAjvError));
        // return res.status(StatusCodes.BAD_REQUEST).json({status: 'errors', code: StatusCodes.BAD_REQUEST,invalid_params:error})
    }
    next(); 
};

module.exports = {addValidator}

