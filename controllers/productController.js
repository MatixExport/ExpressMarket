const Product = require("../models/Product")

const getAllProducts = async (req, res, next)=>{
    const data = await Product.findAll();
    res.status(200).json({
        status: 'success',
        data,
      });
    next();
} 
const createProduct = async (req, res, next)=>{
  const productData = req.body
  const product = await Product.create(productData)
  res.status(200).json({
      status: 'success',
      product,
    });
  next();
} 

module.exports = {getAllProducts,createProduct}
