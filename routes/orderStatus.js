var express = require('express');
var router = express.Router();
const {getAllStatuses} = require("../controllers/orderStatusController.js");



router.get(
  '/',
  getAllStatuses
);


module.exports = router;
