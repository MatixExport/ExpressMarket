const { addValidator } = require('./validation');
const {validateRefeshToken } = require('./refreshToken.schema');

const refreshTokenValidator = async (req,res, next) => {
    await addValidator(validateRefeshToken,req,res,next);
};

module.exports = {refreshTokenValidator};