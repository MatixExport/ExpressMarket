const {StatusCodes} = require('http-status-codes');

const responseFormatter = (req, res, next) => {
    res.success = (data,code = StatusCodes.OK) => {
      res.status(code).json({
        data
      });
    };

    res.errors = (messages,code = StatusCodes.BAD_REQUEST) =>{
      res.status(code).json({
        instance:req.url,
        error: {
          code:code,
          message:messages
        },
        metadata: {
          timestamp: new Date().toISOString(),
        }
      });
    }
  
    res.error = (message, code = StatusCodes.BAD_REQUEST) => {
      res.status(code).json({
        instance:req.url,
        error: {
          code,
          message:[
            {
              message:message,
              field:"global"
            }
        ]
        },
        metadata: {
          timestamp: new Date().toISOString(),
        }
      });
    };
  
    next();
  };

  module.exports = {responseFormatter}
  