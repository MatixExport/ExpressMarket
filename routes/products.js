var express = require('express');
const { getAllProducts, createProduct,getProductById,updateProductById,getProductSeoDescById} = require('../controllers/productController');
const {addProductValidator,updateProductValidator} = require('../validators/productValidation')
const {validatePkExists} = require('../validators/validation');
const Product = require('../models/Product');


const validateProductPkExists = validatePkExists("productId",Product);

var router = express.Router();

router.get('/', getAllProducts);
router.post('/',addProductValidator ,createProduct);
router.get(
    '/:productId',
    validateProductPkExists,
    getProductById);

router.get(
    '/:productId/seo-description',
    validateProductPkExists,
    getProductSeoDescById);

router.put('/:productId',
    validateProductPkExists,
    updateProductValidator,
    updateProductById);

module.exports = router;
