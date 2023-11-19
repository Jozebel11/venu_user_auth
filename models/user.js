const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // import your sequelize configured instance

const User = sequelize.define('User', {
  facebookId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true, // assuming birthday might not be provided
    validate: {
      isDate: true
    }
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true // assuming gender might not be provided
  },
  interestedInGender: {
    type: DataTypes.STRING,
    allowNull: true // assuming this might not be provided
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // Additional model options go here
  tableName: 'users',
  timestamps: true, // to add createdAt and updatedAt fields
});

// Syncing the model with the database to create the appropriate table
// In production, you might want to use migrations instead of sync
User.sync().then(() => {
  console.log('User table created successfully!');
}).catch((error) => {
  console.error('Unable to create table:', error);
});

module.exports = User;