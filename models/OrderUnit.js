const { Sequelize,DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sequelize');


class OrderUnit extends Model {}

OrderUnit.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'OrderUnit', 
  },
);

module.exports =  OrderUnit