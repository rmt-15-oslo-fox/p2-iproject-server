'use strict';
const {
  Model
} = require('sequelize');
const {decode, encode} = require(`../helpers/bcrypt.js`)
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Email is required`
        },
        isEmail: {
          msg: `Must be an email`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password is required`
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Username is required`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encode(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};