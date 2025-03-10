var express = require('express');
var router = express.Router();
const {updateUser,getUser} = require("../controllers/userController");
const {updateUserValidator} = require('../middlewares/validators/userValidation')
const {validatePkExists,validateIsUserOrHasRole} = require('../middlewares/validators/validation');
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

router.get(
    '/whoami',
    passport.authenticate(["jwt"], { session: false }),
    getUser);

module.exports = router;
