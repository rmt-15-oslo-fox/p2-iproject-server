'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Sparring, { foreignKey: "AuthorId" })
      User.hasOne(models.UserSparrings, { foreignKey: "UserId" })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Username is required"
        },
      },
      unique: {
        args: true,
        msg: "Username is already exists"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "User.email cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Invalid email format"
        },
      },
      isEmail: {
        args: true,
        msg: "Invalid email format"
      },
      unique: {
        args: true,
        msg: "Email is already exists"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};