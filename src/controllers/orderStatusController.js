const {OrderStatus} = require("../models/OrderStatus");


const getAllStatuses = async (req, res, next)=>{
    return res.success(await OrderStatus.findAll());
 } 

module.exports = {getAllStatuses}