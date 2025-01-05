const Product = require("../models/Product");
const {StatusCodes} = require('http-status-codes');
const {getSeoDescFromGroq} = require("../lookup/lookup")


const getProductById = async (req, res, next)=>{
  const data = req.pkObj;
  return res.success(data);
} 

const getProductSeoDescById = async (req, res, next)=>{
  const product = req.pkObj;
  const {status,body} = await getSeoDescFromGroq(product);
  if(status <= 300){
    return res.success(
        `${body.choices[0].message.content}`
    );
  }
  return  res.error("groq unavailable", code = StatusCodes.FAILED_DEPENDENCY);

}

const updateProductById = async (req,res,next)=>{
  const updateData = req.body;
  try {
    const product = req.pkObj;
    await product.update(updateData);
    return res.success(product)
} catch (error) {
    return res.error('An error occurred while updating the product');
}
}

const getAllProducts = async (req, res, next)=>{
    const data = await Product.findAll();
    return res.success(data);

} 

const createProduct = async (req, res, next)=>{
  const productData = req.body
  const product = await Product.create(productData)
  return res.success(product);
} 

const createProductsFromList = async (req,res,next)=>{
  try{
    const count = await Product.count();
    if(count > 3){
      return res.error("Product table is not empty.",StatusCodes.CONFLICT);
    }
    const insertedProducts = await Product.bulkCreate(req.body.Products);
    return res.success({"message":`${insertedProducts.length.toString()} products inserted.`})
  }
  catch(error){
    return res.error('An error occurred while inserting the products',code=StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {getAllProducts,createProduct,getProductById,updateProductById,getProductSeoDescById,createProductsFromList}
