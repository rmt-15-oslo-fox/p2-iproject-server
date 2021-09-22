"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Payment, {
        foreignKey: "receiverId",
      });
      User.hasMany(models.Payment, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          message: "Username has been registered",
        },
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT USERNAME",
          },
          notNull: {
            msg: "PLEASE INSERT USERNAME",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          message: "Email has been registered",
        },
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT EMAIL",
          },
          notNull: {
            msg: "PLEASE INSERT EMAIL",
          },
          isEmail: {
            args: true,
            msg: "Not a valid email format",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT NAME",
          },
          notNull: {
            msg: "PLEASE INSERT NAME",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT PASSWORD",
          },
          notNull: {
            msg: "PLEASE INSERT PASSWORD",
          },
        },
      },
      balance: {
        type: DataTypes.STRING,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (data, options) => {
          if (data.balance < 0 || !data.balance) {
            data.balance = 0;
          }
          const hashedPwd = hash(data.password);
          data.password = hashedPwd;
        },
        beforeUpdate: (data, options) => {
          if (data.balance < 0 || !data.balance) {
            data.balance = 0;
          }
          const hashedPwd = hash(data.password);
          data.password = hashedPwd;
        },
      },
    }
  );
  return User;
};
