"use strict";
const { Model } = require("sequelize");
const valiDate = require("../helpers/valiDate");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "payer",
      });
      Payment.belongsTo(models.User, {
        foreignKey: "receiverId",
        as: "receiver",
      });
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
      paid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT PAID AMOUNT",
          },
          notNull: {
            msg: "PLEASE INSERT PAID AMOUNT",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT DESCRIPTION",
          },
          notNull: {
            msg: "PLEASE INSERT DESCRIPTION",
          },
        },
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE CHOOSE DEADLINE",
          },
          notNull: {
            msg: "PLEASE CHOOSE DEADLINE",
          },
          isAfter: {
            args: valiDate(new Date()),
            msg: "DEADLINE CANNOT BE BEFORE TODAY",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PLEASE INSERT DESCRIPTION",
          },
          notNull: {
            msg: "PLEASE INSERT DESCRIPTION",
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
