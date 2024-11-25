const { Sequelize,DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sequelize');


class Product extends Model {}

Product.init(
  {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    },
    weight: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    },
    
  },
  {
    sequelize, 
    modelName: 'Product', 
  },
);

module.exports =  Product