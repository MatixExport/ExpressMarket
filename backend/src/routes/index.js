var express = require('express');
var router = express.Router();
const Category = require("../models/Category")
const Product = require("../models/Product")
const  passport  =  require("../middlewares/passport");
const {createProductsFromList} = require('../controllers/productController');
const {addBulkProductValidator} = require('../middlewares/validators/productValidation')
const {validateHasRole} = require("../middlewares/validators/validation");
const {userRoles} = require("../models/userRoles");

router.post(
  '/init', 
   passport.authenticate(["jwt"], { session: false }),
   validateHasRole(userRoles.EMPLOYEE),
   addBulkProductValidator,
   createProductsFromList
);

module.exports = router;
