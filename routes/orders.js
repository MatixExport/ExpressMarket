var express = require('express');
var router = express.Router();
const {getOrdersByUserId,getAllOrders,createOrder,updateOrder} = require("../controllers/orderController");
const {addOrderValidator} = require("../validators/orderValidation");
const {validatePkExists} = require("../validators/validation");
const User = require('../models/User');
const Order = require('../models/Order');

const validateUserPkExists = validatePkExists("userId",User);
const validateOrderPkExists = validatePkExists("orderId",Order);


router.get(
  '/',
  getAllOrders
);

router.post(
  '/',
  addOrderValidator,
  createOrder
);

router.get(
  '/:userId',
  validateUserPkExists,
  getOrdersByUserId
);

router.put(
  '/:orderId',
  validateOrderPkExists,
  updateOrder
);

module.exports = router;
