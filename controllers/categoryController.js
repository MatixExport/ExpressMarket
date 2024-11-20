const Category = require("../models/Category");


const getAllCategories = async (req, res, next)=>{
    return res.success(await Category.findAll());
 } 

module.exports = {getAllCategories}