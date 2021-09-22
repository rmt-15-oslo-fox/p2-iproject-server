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
      User.hasMany(models.Favourite, {foreignKey: "userId"})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notNull: {
          msg: "Please input email"
        },
        notEmpty: {
          msg: "Please input email"
        },
        isEmail:{
          msg: "Please input a valid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Please input password"
        },
        notEmpty: {
          msg: "Please input password"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};