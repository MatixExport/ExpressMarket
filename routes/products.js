var express = require('express');

const { getAllProducts, createProduct,getProductById,updateProductById,getProductSeoDescById} = require('../controllers/productController');
const {addProductValidator,updateProductValidator} = require('../validators/productValidation')
const {validatePkExists,validateHasRole} = require('../validators/validation');
const  passport  =  require("../middlewares/passport");
const Product = require('../models/Product');
const {userRoles} = require('../models/userRoles')


const validateProductPkExists = validatePkExists("productId",Product);

var router = express.Router();

router.get('/', getAllProducts);
router.post('/',
    passport.authenticate(["jwt"], { session: false }),
    validateHasRole(userRoles.EMPLOYEE),
    addProductValidator,
    createProduct);
    
router.get(
    '/:productId',
    validateProductPkExists,
    getProductById);

router.get(
    '/:productId/seo-description',
    validateProductPkExists,
    getProductSeoDescById);

router.put('/:productId',
    passport.authenticate(["jwt"], { session: false }),
    validateHasRole(userRoles.EMPLOYEE),
    validateProductPkExists,
    updateProductValidator,
    updateProductById);

module.exports = router;
