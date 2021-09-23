'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sparring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sparring.belongsTo(models.UserSparring, { foreignKey: "UserSparringId" })
      Sparring.belongsTo(models.User, { foreignKey: "UserId" })
    }
  };
  Sparring.init({
    UserSparringId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "User sparring id cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "User sparring id is required"
        },
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "User id cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "User id is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Sparring',
  });
  return Sparring;
};