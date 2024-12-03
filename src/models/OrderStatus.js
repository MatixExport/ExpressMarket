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



module.exports = OrderStatus