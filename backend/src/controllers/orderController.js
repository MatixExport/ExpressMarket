const Order = require("../models/Order");
const OrderUnit = require("../models/OrderUnit");
const OrderReview = require("../models/OrderReview");
const {StatusCodes} = require('http-status-codes');
const OrderStatus = require("../models/OrderStatus")
const {orderStatuses} = require("../models/OrderStatusInit")
const Product = require("../models/Product");
const User = require("../models/User");
const { or } = require("sequelize");
const { sequelize } = require('../config/sequelize');

const getOrdersByUserId = async (req, res, next)=>{
   const user = req.pkObj;
   const orders = await Order.findAll({where:{UserId:user.id},include:[Product,OrderReview]});
   return res.success(orders);
} 

const getOrdersByUserLogin = async (req, res, next)=>{
    const username = req.params["login"];
    const user = await User.findOne({where:{login:username}});
    if(!user){
        return res.error("User with specified login those not exist",StatusCodes.NOT_FOUND);
    }
    const orders = await Order.findAll({where:{UserId:user.id},include:[Product,OrderReview,OrderStatus]});
    return res.success(orders);
 } 


const getOrdersByOrderStatus = async (req, res, next)=>{
    const orderStatus = req.pkObj;
    const orders = await Order.findAll({where:{OrderStatusId:orderStatus.id},include:[Product,OrderReview,OrderStatus]});
    return res.success(orders);
 } 

const getOrderById = async (req,res,next)=>{
    const order = await Order.findByPk(req.pkObj.id,{include:[Product,OrderReview]})
    return res.success(order);
}

const getUserOrders = async (req,res,next)=>{
    const orders = await Order.findAll({where:{UserId:req.user.id},include:[Product,OrderReview,OrderStatus]});
    return res.success(orders);
}

const createOrder = async (req, res, next)=>{
    const orderData = req.body;

    let i = 0
    while(i < orderData["Products"].length){
        if(!await Product.findByPk(orderData['Products'][i].ProductId)){
            return res.error("Product with provided id does not exist",StatusCodes.NOT_FOUND);
        }
        i++;
    }
    
    orderData['OrderStatusId'] = orderStatuses.UNAPPROVED;
    orderData['confirmDate'] = null;
    orderData['UserId'] = req.user.id;

    try {
        const order2 = await sequelize.transaction(async t => {
            const order = await Order.create(orderData,{ transaction: t });
            for (const element of orderData["Products"]) {
                element["OrderId"] = order.id;
                await OrderUnit.create(element, { transaction: t });
            }
            return order;
            });

        return res.success(order2);
        
      } catch (error) {
        console.log(error)
        return res.error("Product with provided id was removed between query and execution",StatusCodes.CONFLICT);
      }

 } 

const updateOrder = async (req,res,next)=>{
    const updateData = req.body;
    const order = req.pkObj;
    try {
        await order.update(updateData);
        return res.success(order)
    } catch (error) {
        return res.error('An error occurred while updating the order');
    }
}

const confirmOrder = async (req,res,next)=>{
    const order = req.pkObj;
    if(order.OrderStatusId !== orderStatuses.APPROVED){
        return res.error("Order status must be marked as approved",code=StatusCodes.CONFLICT);
    }
    const updateData = {
        confirmDate:new Date().toISOString(),
        OrderStatusId:orderStatuses.COMPLETED
    };
    await order.update(updateData);
    return res.success({});
}

const cancelOrder = async (req,res,next)=>{
    const order = req.pkObj;
    if(order.OrderStatusId === orderStatuses.CANCELED){
        return res.error("Order already canceled",code=StatusCodes.CONFLICT);
    }
    if(order.OrderStatusId === orderStatuses.COMPLETED){
        return res.error("Order already completed",code=StatusCodes.CONFLICT);
    }

    await order.update({OrderStatusId:orderStatuses.CANCELED});
    return res.success({});

}

const addOrderReview = async(req,res,next)=>{
    const order = req.pkObj;

    if((order.OrderStatusId !== orderStatuses.CANCELED)&&(order.OrderStatusId !== orderStatuses.COMPLETED)){
        return res.error("Reviews can only be added to orders that are completed or canceled",code=StatusCodes.CONFLICT);
    }

    if(await OrderReview.findOne({where:{OrderId:order.id}})){
        return res.error("Review already exists",code=StatusCodes.CONFLICT);
    }

    const orderReviewData = req.body;
    orderReviewData['OrderId'] = order.id;
    const review = await OrderReview.create(orderReviewData);
    return res.success(review,StatusCodes.CREATED);
}

const getAllOrders = async (req, res, next)=>{
    return res.success(await Order.findAll({include:[Product,OrderReview,OrderStatus]}));
 } 

module.exports = {getOrdersByUserId,getAllOrders,createOrder,updateOrder,addOrderReview,getUserOrders,
    confirmOrder,cancelOrder,getOrderById,getOrdersByUserLogin,getOrdersByOrderStatus
}