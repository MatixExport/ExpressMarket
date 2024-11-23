var express = require('express');
var router = express.Router();
const  passport  =  require("../middlewares/passport");
const {getOrdersByUserId,getAllOrders,createOrder,updateOrder,addOrderReview,cancelOrder,confirmOrder} = require("../controllers/orderController");
const {addOrderValidator,updateOrderValidator} = require("../validators/orderValidation");
const {addOrderReviewValidator} = require("../validators/orderReviewValidation");
const {validatePkExists,validateIsOwnerOfPkObj,validateHasRole} = require("../validators/validation");
const {userRoles} = require("../models/userRoles");
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
  passport.authenticate(["jwt"], { session: false }),
  addOrderValidator,
  createOrder
);

router.post(
  '/:orderId/review',
  passport.authenticate(["jwt"], { session: false }),
  validateOrderPkExists,
  validateIsOwnerOfPkObj,
  addOrderReviewValidator,
  addOrderReview
);

router.post(
  '/:orderId/confirm',
  passport.authenticate(["jwt"], { session: false }),
  validateOrderPkExists,
  validateIsOwnerOfPkObj,
  confirmOrder
);

router.post(
  '/:orderId/cancel',
  passport.authenticate(["jwt"], { session: false }),
  validateOrderPkExists,
  validateIsOwnerOfPkObj,
  cancelOrder
);

router.get(
  '/:userId',
  passport.authenticate(["jwt"], { session: false }),
  validateUserPkExists,
  getOrdersByUserId
);

router.put(
  '/:orderId',
  passport.authenticate(["jwt"], { session: false }),
  validateHasRole(userRoles.EMPLOYEE),
  validateOrderPkExists,
  updateOrderValidator,
  updateOrder
);

module.exports = router;
