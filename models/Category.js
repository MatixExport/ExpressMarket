const { Sequelize,DataTypes, Model } = require('sequelize');
const {sequelize} = require("../config/sequelize")
class Category extends Model {}

Category.init(
  {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, 
    modelName: 'Category', 
  },
);

module.exports = Category 