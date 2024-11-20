const Order = require("../models/Order");
const OrderUnit = require("../models/OrderUnit");
const Product = require("../models/Product");

const getOrdersByUserId = async (req, res, next)=>{
   const user = req.pkObj;
   const orders = await Order.findAll({where:{UserId:user.id},include:[Product]});
   return res.success(orders);
} 

const createOrder = async (req, res, next)=>{
    const orderData = req.body;
    orderData['OrderStatusId'] = 1;
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
        console.error('Error updating product:', error);
        res.error('An error occurred while updating the order');
    }
}

const getAllOrders = async (req, res, next)=>{
    return res.success(await Order.findAll());
 } 

module.exports = {getOrdersByUserId,getAllOrders,createOrder,updateOrder}