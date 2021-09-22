"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.User, {
        foreignKey: "instructor_id",
        as: "Instructor",
      });
      Course.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }
  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Course title is required",
          },
          notNull: {
            msg: "Course title is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Course description is required",
          },
          notNull: {
            msg: "Course description is required",
          },
        },
      },
      rating: DataTypes.INTEGER,
      instructor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Instructor is required",
          },
          notEmpty: {
            msg: "Instructor is required",
          },
        },
      },
      thumbnail_url: DataTypes.STRING,
      course_level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: ["Beginner", "Medium", "Expert"],
          },
          notEmpty: {
            msg: "Course Level is required",
          },
          notNull: {
            msg: "Course level is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [10_000],
            msg: "Course price must be greather then Rp10.000",
          },
          notEmpty: {
            msg: "Course price is required",
          },
          notNull: {
            msg: "Course price is required",
          },
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  Course.beforeCreate((course) => {
    course.rating = 0;
  });
  return Course;
};
