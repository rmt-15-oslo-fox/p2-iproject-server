"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCourse.belongsTo(models.Course, { foreignKey: "CourseId" });
    }
  }
  UserCourse.init(
    {
      UserId: DataTypes.INTEGER,
      CourseId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      order_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserCourse",
    }
  );
  return UserCourse;
};
