var express = require('express');
var router = express.Router();
const {login,refreshToken,registerUser} = require("../controllers/authController");
const {addUserValidator,validateLogin} = require('../validators/userValidation')
const {refreshTokenValidator} = require('../validators/refreshTokenValidation')


router.post(
    '/login',
    validateLogin,
    login);

router.post(
    '/refresh',
    refreshTokenValidator,
    refreshToken);

router.post(
  '/register',
  addUserValidator,
  registerUser);

module.exports = router;
