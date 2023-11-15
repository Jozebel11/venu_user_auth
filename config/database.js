const { Sequelize } = require('sequelize');
require('dotenv').config();
// Use environment variables to keep sensitive data secure


// Option 1: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false, // You can enable logging by setting it to console.log
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // If you are using a database instance that requires SSL, you can enable it in the options.
   
  });



module.exports = sequelize;