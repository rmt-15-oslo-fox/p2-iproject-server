'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User)
    }
  };
  Item.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    tag: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active",
      validate: {
        isIn: {
          args: [["Active", "Inactive", "Archived"]],
          msg: "Wrong status option!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};