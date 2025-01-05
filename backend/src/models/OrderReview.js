const { Sequelize,DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sequelize');


class OrderReview extends Model {}

OrderReview.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
  },
  {
    sequelize, 
    modelName: 'OrderReview', 
  },
);

module.exports =  OrderReview