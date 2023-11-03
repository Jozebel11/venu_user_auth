//user model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define( "user", {
      facebookId: {
          type: DataTypes.STRING,
          allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
    },
      email: {
          type: DataTypes.STRING,
          unique: true,
          isEmail: true, //checks for email format
          allowNull: false
      },
      birthday: {
          type: DataTypes.STRING,
          allowNull: false
      },
      gender: DataTypes.STRING,
      friends: DataTypes.STRING,
      photos: DataTypes.STRING,
  }, {timestamps: true}, )
  return User
}
