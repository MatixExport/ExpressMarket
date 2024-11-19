const Product = require("../models/Product")


const getProductById = async (req, res, next)=>{
  const data = await Product.findByPk(req.params.productId);
  res.success(data);
} 

const updateProductById = async (req,res,next)=>{
  const updateData = req.body;
  const productId = req.params.productId;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
        res.error(`Product with id ${productId} not found`);
    }
    await product.update(updateData);
    res.success(product)
} catch (error) {
    console.error('Error updating product:', error);
    res.error('An error occurred while updating the product');
}
}

const getAllProducts = async (req, res, next)=>{
    const data = await Product.findAll();
    res.success(data);

} 

const createProduct = async (req, res, next)=>{
  const productData = req.body
  const product = await Product.create(productData)
  res.success(data);

} 



module.exports = {getAllProducts,createProduct,getProductById,updateProductById}
