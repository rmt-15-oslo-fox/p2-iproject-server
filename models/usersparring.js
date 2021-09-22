'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSparring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSparring.belongsTo(models.Sparrings, { foreignKey: "SparringId" })
      UserSparring.belongsTo(models.Users, { foreignKey: "UserId" })
    }
  };
  UserSparring.init({
    SparringId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Sparring id cannot be null"
        },
        notEmpty: {
          args: true,
          msg: "Sparring id is required"
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
    modelName: 'UserSparring',
  });
  return UserSparring;
};