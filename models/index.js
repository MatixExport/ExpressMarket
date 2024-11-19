const setUpAssociations = require('./associations')
const { sequelize } = require('../config/sequelize');
const Category = require("./Category")
const Product = require("./Product")
const Order = require("./Category")
const OrderUnit = require("./Product")
const OrderStatus = require("./Category")
const User = require("./Product")
const Role = require("./Category")

async function init() {
    setUpAssociations()
    await sequelize.sync({ force: true });

    await Category.create({ name:"Category1" });
    await Category.create({ name:"Category2" });
    await Category.create({ name:"Category3" });

    await OrderStatus.create({name:"Status1"});
    await OrderStatus.create({name:"Status2"});
    await OrderStatus.create({name:"Status3"});

    await Product.create({name:"P1",description:"P1 DESC",price:12.2,weight:5,CategoryId:1});
    await Product.create({name:"P2",description:"P2 DESC",price:15.2,weight:10.1,CategoryId:1});
}


init().then(()=>{
    console.log("DB synced")
})




