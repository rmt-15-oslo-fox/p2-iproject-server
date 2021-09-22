const { Course, User, Category } = require("../models");
class Controller {
  static async getAllCourses(req, res, next) {
    try {
      const courses = await Course.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt", "email"],
            },
            as: "Instructor",
          },
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json({
        code: 200,
        message: "success get all available courses",
        status: "success",
        courses,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
