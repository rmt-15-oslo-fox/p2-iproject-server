"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT RECEIVER ID",
          },
          notNull: {
            msg: "PLEASE INSERT RECEIVER ID",
          },
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT AMOUNT",
          },
          notNull: {
            msg: "PLEASE INSERT AMOUNT",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT AMOUNT",
          },
          notNull: {
            msg: "PLEASE INSERT AMOUNT",
          },
        },
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT AMOUNT",
          },
          notNull: {
            msg: "PLEASE INSERT AMOUNT",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
