'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipmentUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EquipmentUser.belongsTo(models.User, {foreignKey:'UserId'})
    }
  };
  EquipmentUser.init({
    EquipmentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    jumlah: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'EquipmentUser',
  });
  return EquipmentUser;
};