import {
	StatusCodes,
} from 'http-status-codes';




export const addValidator = async (validate,req,res, next) => {
    const isValid = validate(req.body);
    if (!isValid && validate.errors) { 
        // const error = await validateUser.errors;
        return res.status(StatusCodes.BAD_REQUEST).json({status: 'errors', code: StatusCodes.BAD_REQUEST})
    }
    next(); 
};

