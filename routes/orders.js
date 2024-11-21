var express = require('express');
var router = express.Router();
const  passport  =  require("../middlewares/passport");
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
  // passport.authenticate(["jwt", "basic"], { session: false }),
  addOrderValidator,
  createOrder
);

router.get(
  '/:userId',
  // passport.authenticate(["jwt", "basic"], { session: false }),
  validateUserPkExists,
  getOrdersByUserId
);

router.put(
  '/:orderId',
  // passport.authenticate(["jwt", "basic"], { session: false }),
  validateOrderPkExists,
  updateOrder
);

module.exports = router;
