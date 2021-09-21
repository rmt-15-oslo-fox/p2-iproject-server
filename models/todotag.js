"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TodoTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TodoTag.belongsTo(models.Todo);
      TodoTag.belongsTo(models.Tag);
    }
  }
  TodoTag.init(
    {
      TodoId: DataTypes.INTEGER,
      TagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TodoTag",
    }
  );
  return TodoTag;
};
