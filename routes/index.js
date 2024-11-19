var express = require('express');
var router = express.Router();
const Category = require("../models/Category")
const Product = require("../models/Product")


/* GET home page. */
router.get('/', async function(req, res, next) {
  const jane = await Category.create({ name:"Ufo" });
  // res.render('index', { title: jane.id});
});

module.exports = router;
