var express = require('express');
var router = express.Router();
const {registerUser,updateUser} = require("../controllers/userController");
const {addUserValidator,updateUserValidator} = require('../validators/userValidation')
const {validatePkExists} = require('../validators/validation');
const User = require('../models/User');


const validateUserPkExists = validatePkExists("userId",User);

router.put(
  '/:userId',
  validateUserPkExists,
  updateUserValidator,
  updateUser);

module.exports = router;
