const Order = require("../models/Order");
const OrderUnit = require("../models/OrderUnit");
const OrderReview = require("../models/OrderReview");
const {StatusCodes} = require('http-status-codes');
const {orderStatuses} = require("../models/OrderStatus")
const Product = require("../models/Product");

const getOrdersByUserId = async (req, res, next)=>{
   const user = req.pkObj;
   const orders = await Order.findAll({where:{UserId:user.id},include:[Product,OrderReview]});
   return res.success(orders);
} 

const getUserOrders = async (req,res,next)=>{
    const orders = await Order.findAll({where:{UserId:req.user.id},include:[Product,OrderReview]});
    return res.success(orders);
}

const createOrder = async (req, res, next)=>{
    const orderData = req.body;
    orderData['OrderStatusId'] = orderStatuses.UNAPRROVED;
    orderData['confirmDate'] = null;
    orderData['UserId'] = 1;

    const order = await Order.create(orderData);
    orderData["Products"].forEach(async element => {
        await OrderUnit.create(element);
    });
    return res.success(order);
 } 

const updateOrder = async (req,res,next)=>{
    const updateData = req.body;
    try {
        const order = res.pkObj;
        await order.update(updateData);
        res.success(order)
    } catch (error) {
        res.error('An error occurred while updating the order');
    }
}

const confirmOrder = async (req,res,next)=>{
    const order = req.pkObj;
    if(order.orderStatusId != orderStatuses.APPROVED){
        res.error("Order status must be marked as approved",code=StatusCodes.CONFLICT);
    }
    const updateData = {
        confirmDate:new Date().toISOString(),
        OrderStatusId:orderStatuses.COMPLETED
    };
    await order.update(updateData);
    res.success({});
}

const cancelOrder = async (req,res,next)=>{
    const order = req.pkObj;
    if(order.orderStatusId == orderStatuses.CANCELED){
        res.error("Order already canceled",code=StatusCodes.CONFLICT);
    }
    await order.update({OrderStatusId:orderStatuses.CANCELED});
    res.success({});

}

const addOrderReview = async(req,res,next)=>{
    const order = req.pkObj;
    const orderReviewData = req.body;
    orderReviewData['OrderId'] = order.id;
    OrderReview.create(orderReviewData);
}

const getAllOrders = async (req, res, next)=>{
    return res.success(await Order.findAll());
 } 

module.exports = {getOrdersByUserId,getAllOrders,createOrder,updateOrder,addOrderReview,getUserOrders,
    confirmOrder,cancelOrder
}