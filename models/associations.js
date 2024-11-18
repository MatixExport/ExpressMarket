const Category = require("./Category")
const Product = require("./Product")
const Order = require("./Order")
const OrderUnit = require("./OrderUnit")
const OrderStatus = require("./OrderStatus")
const User = require("./User")
const Role = require("./Role")



const setUpAssociations = ()=>{
    // Many Products to One Category
    Category.hasMany(Product);
    Product.belongsTo(Category);


    // Many Users to One Role
    Role.hasMany(User);
    User.belongsTo(Role);


    // Many Orders to One OrderStatus
    OrderStatus.hasMany(Order);
    Order.belongsTo(OrderStatus);

     // Many Orders to Many Products
    Order.belongsToMany(Product,{through: OrderUnit})
    Product.belongsToMany(Order,{through: OrderUnit})

 
}

module.exports = setUpAssociations
  


