const setUpAssociations = require('./associations')
const { sequelize } = require('../config/sequelize');
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const OrderUnit = require("./OrderUnit");
const {OrderStatus,initOrderStatuses} = require("./OrderStatus");
const User = require("./User");
const {hashPassword} = require("../util/authHelper");

async function init() {
    setUpAssociations()
    await sequelize.sync({ force: true });
    
    await initOrderStatuses();
    if((await Category.findAll()).length == 0){
        await Category.create({ name:"Category1" });
        await Category.create({ name:"Category2" });
        await Category.create({ name:"Category3" });
    }

    await Product.create({name:"P1",description:"P1 DESC",price:12.2,weight:5,CategoryId:1});
    await Product.create({name:"P2",description:"P2 DESC",price:15.2,weight:10.1,CategoryId:1});

    await User.create({login:"jan",password:await hashPassword("niestety"),email:"jan@wp.pl",phone:"712345674",role:"client"});
    await User.create({login:"root",password:await hashPassword("niestety"),email:"jan@wp.pl",phone:"712345674",role:"employee"});
    
    await Order.create({confirmDate:null,OrderStatusId:1,UserId:1});
    await OrderUnit.create({OrderId:1,ProductId:1,quantity:1});
    await OrderUnit.create({OrderId:1,ProductId:2,quantity:2});
}


init().then(()=>{
    console.log("DB synced")
})




