const {StatusCodes} = require('http-status-codes');


const parseAjvError = (error)=>{
    return {
      params:error.params,
      message:error.message,
      instance:error.instancePath
    }
  }


const validatePkExists = (pkname,repo,name="pkObj")=>{
  return async (req,res,next)=>{
    const pk = req.params[pkname];
    const obj = await repo.findByPk(pk);
    if (!obj) {
        const msg = `Record with pk ${pk} in not found.`;
        return res.error(msg);
    }
    req[name] = obj;
    next();
  }
}

const validateIsOwnerOfPkObj = (req,res,next)=>{
  if(req.user.id !== req.pkObj.UserId){
    return res.error("User must be the owner of object",StatusCodes.FORBIDDEN);
  }
  next();
}

const validateHasRole = (role)=>{
  return (req,res,next)=>{
    if(req.user.role !== role){
      return res.error(`User does not have role ${role}`,code=StatusCodes.FORBIDDEN);
    }
    next();
  }
}


const validateIsUserOrHasRole = (role)=>{
    return (req,res,next)=>{
        if((req.user.role === role)||(req.user.id = req.pkObj.id)){
            next();
        }
        else{
            return res.error("Users without specific roles can only edit their own accounts",StatusCodes.FORBIDDEN);
        }
    }
}


const addValidator = async (validate,req,res, next) => {
    const isValid = validate(req.body);
    if (!isValid && validate.errors) { 
        const errors = await validate.errors;
        return res.error(errors.map(parseAjvError));
    }
    next(); 
};

module.exports = {addValidator,validatePkExists,validateHasRole,validateIsOwnerOfPkObj,validateIsUserOrHasRole}

