const {StatusCodes} = require('http-status-codes');

const responseFormatter = (req, res, next) => {
    res.success = (data,code = StatusCodes.OK) => {
      res.status(code).json({
        data
      });
    };
  
    res.error = (message, code = StatusCodes.BAD_REQUEST) => {
      res.status(code).json({
        instance:req.url,
        error: {
          code,
          message,
        },
        metadata: {
          timestamp: new Date().toISOString(),
        }
      });
    };
  
    next();
  };

  module.exports = {responseFormatter}
  