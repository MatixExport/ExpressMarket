const { Sequelize,DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sequelize');


class User extends Model {}

User.init(
  {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
  },
  {
    sequelize, 
    modelName: 'User', 
  },
);

module.exports =  User