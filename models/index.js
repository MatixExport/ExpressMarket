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
 
}


init().then(()=>{
    console.log("DB synced")
})




