var express = require('express');
const { getAllProducts } = require('../controllers/ProductController');
var router = express.Router();


/* GET users listing. */
router.get('/', getAllProducts);

module.exports = router;
