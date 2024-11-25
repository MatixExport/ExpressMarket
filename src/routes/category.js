var express = require('express');
var router = express.Router();
const {getAllCategories} = require("../controllers/categoryController");



router.get(
  '/',
  getAllCategories
);


module.exports = router;
