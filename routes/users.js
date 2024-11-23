var express = require('express');
var router = express.Router();
const {registerUser,updateUser} = require("../controllers/userController");
const {addUserValidator,updateUserValidator} = require('../validators/userValidation')
const {validatePkExists,validateIsUserOrHasRole} = require('../validators/validation');
const User = require('../models/User');
const  passport  =  require("../middlewares/passport");
const {userRoles} = require("../models/userRoles");


const validateUserPkExists = validatePkExists("userId",User);

router.put(
  '/:userId',
  passport.authenticate(["jwt"], { session: false }),
  validateUserPkExists,
  validateIsUserOrHasRole(userRoles.EMPLOYEE),
  updateUserValidator,
  updateUser);

module.exports = router;
