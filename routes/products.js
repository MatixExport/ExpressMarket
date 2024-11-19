var express = require('express');
const { getAllProducts, createProduct} = require('../controllers/productController');
const {addProductValidator} = require('../validators/productValidation')
var router = express.Router();


router.get('/', getAllProducts);
router.post('/create',addProductValidator ,createProduct);

module.exports = router;
