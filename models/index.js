const { Sequelize } = require('sequelize');
require('dotenv').config();
// Use environment variables to keep sensitive data secure
const databaseName = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databasePassword = process.env.DB_PASSWORD;
const databaseHost = process.env.DB_HOST;

// Option 1: Passing parameters separately (other dialects)
const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
    host: databaseHost,
    dialect: 'postgres',
    logging: false, // You can enable logging by setting it to console.log
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // If you are using a database instance that requires SSL, you can enable it in the options.
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Note: This will bypass SSL validation. Not recommended for production.
      }
    }
  });

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;