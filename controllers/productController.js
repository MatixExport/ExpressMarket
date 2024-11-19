const Product = require("../models/Product")

const getAllProducts = async (req, res, next)=>{
    data = await Product.findAll();
    res.status(200).json({
        status: 'success',
        data,
      });
    next();
} 

module.exports = {getAllProducts}
