const { Sequelize,DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sequelize');


class RefreshToken extends Model {}

RefreshToken.init(
  {
    token: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: true,
      trim:true,
    },
    expiryDate:{
        type:DataTypes.DATE,
        allowNull:false
    }
  },
  {
    sequelize, 
    modelName: 'RefreshToken', 
  },
);

module.exports = RefreshToken