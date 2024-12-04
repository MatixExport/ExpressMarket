var express = require('express');
var router = express.Router();
const  passport  =  require("../middlewares/passport");
const {getOrdersByUserId,getAllOrders,createOrder,updateOrder,addOrderReview,cancelOrder,confirmOrder,getOrderById,getUserOrders, getOrdersByOrderStatus, getOrdersByUserLogin,} = require("../controllers/orderController");
const {addOrderValidator,updateOrderValidator} = require("../middlewares/validators/orderValidation");
const {addOrderReviewValidator} = require("../middlewares/validators/orderReviewValidation");
const {validatePkExists,validateIsOwnerOfPkObj,validateHasRole} = require("../middlewares/validators/validation");
const {userRoles} = require("../models/userRoles");
const User = require('../models/User');
const Order = require('../models/Order');
const { OrderStatus } = require('../models/OrderStatus');

const validateUserPkExists = validatePkExists("userId",User);
const validateOrderPkExists = validatePkExists("orderId",Order);
const validateOrderStatusPkExists = validatePkExists("statusId",OrderStatus);


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

router.get(
  '/user',
  passport.authenticate(["jwt"], { session: false }),
  getUserOrders
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
  '/status/:statusId',
  passport.authenticate(["jwt"], { session: false }),
  validateHasRole(userRoles.EMPLOYEE),
  validateOrderStatusPkExists,
  getOrdersByOrderStatus
)

router.get(
  '/login/:login',
  passport.authenticate(["jwt"], { session: false }),
  validateHasRole(userRoles.EMPLOYEE),
  getOrdersByUserLogin
)

router.get(
  '/:orderId',
  passport.authenticate(["jwt"], { session: false }),
  validateHasRole(userRoles.EMPLOYEE),
  validateOrderPkExists,
  getOrderById
)

router.get(
  '/user/:userId',
  passport.authenticate(["jwt"], { session: false }),
  validateHasRole(userRoles.EMPLOYEE),
  validateUserPkExists,
  getOrdersByUserId
);



router.patch(
  '/:orderId',
  passport.authenticate(["jwt"], { session: false }),
  validateHasRole(userRoles.EMPLOYEE),
  validateOrderPkExists,
  updateOrderValidator,
  updateOrder
);

module.exports = router;
