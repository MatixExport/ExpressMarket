const { Sequelize,DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sequelize');


class Order extends Model {}

Order.init(
  {
    confirmDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize, 
    modelName: 'Order', 
  },
);

module.exports =  Order