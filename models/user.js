'use strict';
const {
  Model
} = require('sequelize');
const { encode } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Demo, {foreignKey: 'userId'})
      User.hasMany(models.Watchlist, {foreignKey: 'userId'})
      User.hasMany(models.Forums, {foreignKey: 'userId'})
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email is already exists'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
      }
    },
    balance: DataTypes.INTEGER
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