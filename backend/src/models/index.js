const setUpAssociations = require('./associations')
const { sequelize } = require('../config/sequelize');
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const OrderUnit = require("./OrderUnit");
const {initOrderStatuses} = require("./OrderStatusInit");
const User = require("./User");
const {hashPassword} = require("../util/authHelper");

async function init() {
    setUpAssociations()
    await sequelize.sync({ force: true });
    
    await initOrderStatuses();
    if((await Category.findAll()).length === 0){
        await Category.bulkCreate([
            { name: "Beverages" },
            { name: "Snacks" },
            { name: "Fresh Produce" },
            { name: "Dairy & Eggs" },
            { name: "Bakery" },
        ]);
    }

    await Product.bulkCreate([
        // Beverages (ID: 1)
        {name:"Sparkling Mineral Water", description:"750ml bottle of naturally sparkling water.", price:1.99, weight:0.75, CategoryId:1}, // ID: 1
        {name:"Organic Orange Juice", description:"1L carton of freshly squeezed orange juice.", price:3.49, weight:1.0, CategoryId:1}, // ID: 2
        {name:"Cold Brew Coffee", description:"500ml bottle of cold brew coffee.", price:4.25, weight:0.5, CategoryId:1}, // ID: 3
        {name:"Green Tea", description:"Box of 20 organic green tea bags.", price:3.99, weight:0.1, CategoryId:1}, // ID: 4
        {name:"Apple Juice", description:"2L bottle of pure apple juice.", price:2.79, weight:2.0, CategoryId:1}, // ID: 5
        {name:"Coconut Water", description:"1L carton of natural coconut water.", price:3.99, weight:1.0, CategoryId:1}, // ID: 6
        {name:"Lemonade", description:"1.5L bottle of refreshing lemonade.", price:2.50, weight:1.5, CategoryId:1}, // ID: 7
        // Snacks (ID: 2)
        {name:"Sea Salt Potato Chips", description:"150g bag of crispy sea salt potato chips.", price:2.29, weight:0.15, CategoryId:2}, // ID: 8
        {name:"Dark Chocolate Bar", description:"100g bar of 70% cocoa dark chocolate.", price:2.99, weight:0.1, CategoryId:2}, // ID: 9
        {name:"Roasted Almonds", description:"250g bag of lightly salted roasted almonds.", price:6.49, weight:0.25, CategoryId:2}, // ID: 10
        {name:"Classic Pretzels", description:"300g bag of salted pretzels.", price:2.49, weight:0.3, CategoryId:2}, // ID: 11
        {name:"Microwave Popcorn", description:"3-pack of butter flavor microwave popcorn.", price:3.29, weight:0.27, CategoryId:2}, // ID: 12
        {name:"Granola Bars", description:"Box of 6 assorted granola bars.", price:4.99, weight:0.3, CategoryId:2}, // ID: 13
        {name:"Rice Cakes", description:"Pack of 10 plain rice cakes.", price:1.79, weight:0.1, CategoryId:2}, // ID: 14
        // Fresh Produce (ID: 3)
        {name:"Organic Apples", description:"A bag of 6 fresh organic apples.", price:4.99, weight:1.2, CategoryId:3}, // ID: 15
        {name:"Bananas", description:"A bunch of ripe bananas.", price:1.89, weight:0.9, CategoryId:3}, // ID: 16
        {name:"Avocado", description:"A single large ripe avocado.", price:1.99, weight:0.2, CategoryId:3}, // ID: 17
        {name:"Vine Tomatoes", description:"A pound of fresh vine-ripened tomatoes.", price:2.99, weight:0.45, CategoryId:3}, // ID: 18
        {name:"Cucumber", description:"A large, fresh cucumber.", price:0.99, weight:0.3, CategoryId:3}, // ID: 19
        {name:"Yellow Onions", description:"Bag of 3 large yellow onions.", price:1.50, weight:0.7, CategoryId:3}, // ID: 20
        {name:"Russet Potatoes", description:"5lb bag of russet potatoes.", price:3.99, weight:2.27, CategoryId:3}, // ID: 21
        {name:"Red Bell Pepper", description:"A single crisp red bell pepper.", price:1.29, weight:0.15, CategoryId:3}, // ID: 22
        // Dairy & Eggs (ID: 4)
        {name:"Whole Milk", description:"1 gallon of fresh whole milk.", price:3.89, weight:3.9, CategoryId:4}, // ID: 23
        {name:"Greek Yogurt", description:"500g container of plain Greek yogurt.", price:3.50, weight:0.5, CategoryId:4}, // ID: 24
        {name:"Sharp Cheddar Cheese", description:"8oz block of sharp cheddar cheese.", price:4.49, weight:0.22, CategoryId:4}, // ID: 25
        {name:"Unsalted Butter", description:"1lb pack of unsalted butter.", price:3.79, weight:0.45, CategoryId:4}, // ID: 26
        {name:"Cream Cheese", description:"8oz tub of plain cream cheese.", price:2.99, weight:0.22, CategoryId:4}, // ID: 27
        {name:"Sour Cream", description:"16oz container of sour cream.", price:2.29, weight:0.45, CategoryId:4}, // ID: 28
        // Bakery (ID: 5)
        {name:"Sourdough Loaf", description:"A freshly baked artisanal sourdough loaf.", price:5.99, weight:0.8, CategoryId:5}, // ID: 29
        {name:"Blueberry Muffins", description:"A pack of 4 delicious blueberry muffins.", price:4.79, weight:0.4, CategoryId:5}, // ID: 30
        {name:"Whole Wheat Bread", description:"A loaf of sliced whole wheat bread.", price:3.49, weight:0.6, CategoryId:5}, // ID: 31
        {name:"Chocolate Chip Cookies", description:"A dozen fresh-baked chocolate chip cookies.", price:6.99, weight:0.5, CategoryId:5}, // ID: 32
        {name:"Plain Bagels", description:"Pack of 6 plain bagels.", price:3.99, weight:0.5, CategoryId:5}, // ID: 33
        {name:"Butter Croissants", description:"Pack of 2 flaky butter croissants.", price:4.29, weight:0.2, CategoryId:5} // ID: 34
    ]);

    await User.create({login:"client",password:await hashPassword("MarketPassword"),email:"john.doe@example.com",phone:"123456789",role:"client"}); // ID: 1
    await User.create({login:"employee",password:await hashPassword("MarketPassword"),email:"jane.smith@expressmarket.com",phone:"987654321",role:"employee"}); // ID: 2
    await User.create({login:"client2",password:await hashPassword("MarketPassword"),email:"alice.green@example.com",phone:"555111222",role:"client"}); // ID: 3
    await User.create({login:"employee2",password:await hashPassword("MarketPassword"),email:"bob.brown@expressmarket.com",phone:"555333444",role:"employee"}); // ID: 4
    
    // Order 1 for john_doe (UNAPPROVED)
    await Order.create({confirmDate:null,OrderStatusId:1,UserId:1}); // ID: 1
    await OrderUnit.create({OrderId:1,ProductId:1,quantity:2}); // 2x Sparkling Water
    await OrderUnit.create({OrderId:1,ProductId:8,quantity:1}); // 1x Potato Chips

    // Order 2 for john_doe (COMPLETED)
    await Order.create({confirmDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), OrderStatusId: 4, UserId: 1}); // ID: 2
    await OrderUnit.create({OrderId:2, ProductId:15, quantity:1}); // 1x Apples
    await OrderUnit.create({OrderId:2, ProductId:16, quantity:1}); // 1x Bananas

    // Order 3 for alice_green (APPROVED)
    await Order.create({confirmDate:null, OrderStatusId:2, UserId:3}); // ID: 3
    await OrderUnit.create({OrderId:3, ProductId:23, quantity:1}); // 1x Milk
    await OrderUnit.create({OrderId:3, ProductId:29, quantity:1}); // 1x Sourdough
    await OrderUnit.create({OrderId:3, ProductId:24, quantity:2}); // 2x Yogurt

    // Order 4 for john_doe (CANCELED)
    await Order.create({confirmDate:null, OrderStatusId:3, UserId:1}); // ID: 4
    await OrderUnit.create({OrderId:4, ProductId:2, quantity:3}); // 3x Orange Juice

    // Order 5 for alice_green (UNAPPROVED)
    await Order.create({confirmDate:null, OrderStatusId:1, UserId:3}); // ID: 5
    await OrderUnit.create({OrderId:5, ProductId:17, quantity:4}); // 4x Avocado
    await OrderUnit.create({OrderId:5, ProductId:30, quantity:1}); // 1x Muffins
}


init().then(()=>{
    console.log("DB synced")
})




