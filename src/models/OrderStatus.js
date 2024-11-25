const { Sequelize,DataTypes, Model } = require('sequelize');
const {sequelize} = require("../config/sequelize")

class OrderStatus extends Model {}

OrderStatus.init(
  {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'OrderStatus', 
  },
);

const orderStatuses = {
 UNAPRROVED:1,
 APPROVED:2,
 CANCELED:3,
 COMPLETED:4
}
const initOrderStatuses = async ()=>{
  await OrderStatus.create({id:1,name:"UNAPRROVED"})
  await OrderStatus.create({id:2,name:"APPROVED"})
  await OrderStatus.create({id:3,name:"CANCELED"})
  await OrderStatus.create({id:4,name:"COMPLETED"})
}

module.exports = {OrderStatus,initOrderStatuses,orderStatuses}