const { Sequelize,DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/sequelize');


class Role extends Model {}

Role.init(
  {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize, 
    modelName: 'Role', 
  },
);

module.exports =  Role