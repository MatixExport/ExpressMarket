var express = require('express');
const { getAllProducts, createProduct,getProductById,updateProductById} = require('../controllers/productController');
const {addProductValidator,updateProductValidator} = require('../validators/productValidation')
var router = express.Router();

router.get('/', getAllProducts);
router.post('/',addProductValidator ,createProduct);
router.get('/:productId',getProductById);
router.put('/:productId',updateProductValidator,updateProductById);

module.exports = router;
