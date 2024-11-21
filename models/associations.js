const Category = require("./Category")
const Product = require("./Product")
const Order = require("./Order")
const OrderUnit = require("./OrderUnit")
const {OrderStatus} = require("./OrderStatus")
const RefreshToken = require("./RefreshToken")
const User = require("./User")



const setUpAssociations = ()=>{
    // Many Products to One Category
    Category.hasMany(Product);
    Product.belongsTo(Category);


    // Many Users to One Role
    // Role.hasMany(User);
    // User.belongsTo(Role);



    User.hasMany(RefreshToken);
    RefreshToken.belongsTo(User);

    //Many Orders to One User
    User.hasMany(Order);
    Order.belongsTo(User);

    // One Order to One OrderStatus
    OrderStatus.hasOne(Order);
    Order.belongsTo(OrderStatus);

     // Many Orders to Many Products
    Order.belongsToMany(Product,{through: OrderUnit})
    Product.belongsToMany(Order,{through: OrderUnit})

 
}

module.exports = setUpAssociations
  


