"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
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
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name cannot be null",
          },
          notEmpty: {
            msg: "Name is required",
          },
          len: {
            args: [3],
            msg: "Your name is too short! You need 3+ characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email address",
          },
          notNull: {
            msg: "Email cannot be null",
          },
          notEmpty: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be null",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [5],
            msg: "Your password is too short! You need 5+ characters",
          },
        },
      },
      avatar_url: DataTypes.STRING,
      balance: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    const password = user.password;
    user.password = hashPassword(password);
  });
  return User;
};
