var express = require('express');
var router = express.Router();
const Category = require("../models/Category")
const Product = require("../models/Product")
const  passport  =  require("../middlewares/passport");
const {createProductsFromList} = require('../controllers/productController');
const {addBulkProductValidator} = require('../validators/productValidation')


router.post(
  '/init', 
   passport.authenticate(["jwt"], { session: false }),
   addBulkProductValidator,
   createProductsFromList
);

module.exports = router;
