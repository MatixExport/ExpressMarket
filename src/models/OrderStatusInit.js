const OrderStatus = require("./OrderStatus");


const orderStatuses = {
    UNAPPROVED:1,
    APPROVED:2,
    CANCELED:3,
    COMPLETED:4
}
const initOrderStatuses = async ()=>{
    if((await OrderStatus.findAll()).length !== 4){
        await OrderStatus.create({id:1,name:"UNAPPROVED"})
        await OrderStatus.create({id:2,name:"APPROVED"})
        await OrderStatus.create({id:3,name:"CANCELED"})
        await OrderStatus.create({id:4,name:"COMPLETED"})
    }
}


module.exports = {initOrderStatuses,orderStatuses}