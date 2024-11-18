const { Sequelize } = require('sequelize');
config = require("./config")
const sequelize = new Sequelize('sqlite::memory:');



// const sequelize = new Sequelize(config['PG_DB'], config['PG_USER'], config['PG_PASSWORD'], {
//     host: config['PG_HOST'],
//     port: config['PG_PORT'],
//     dialect: 'postgres' ,
//     logging: console.log
//   });


module.exports ={
    sequelize
}


