const {StatusCodes} = require('http-status-codes');

const responseFormatter = (req, res, next) => {
    res.success = (data,code = StatusCodes.OK, metadata = {}, links = {}) => {
      res.status(code).json({
        data,
        metadata,
        links
      });
    };
  
    res.error = (message, code = StatusCodes.BAD_REQUEST, details = {}) => {
      res.status(code).json({
        instance:req.url,
        error: {
          code,
          message,
          details
        },
        metadata: {
          timestamp: new Date().toISOString(),
        }
      });
    };
  
    next();
  };

  module.exports = {responseFormatter}
  