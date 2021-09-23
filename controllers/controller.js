const { Course, User, Category, UserCourse } = require("../models");
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

  static async getCourseDataById(req, res, next) {
    const { id } = req.params;
    try {
      const course = await Course.findByPk(id, {
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

      if (!course) {
        throw {
          name: "Course Not Found",
        };
      }

      res.status(200).json({
        code: 200,
        message: `success get course with id ${course.id}`,
        status: "success",
        course: course,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json({
        code: 200,
        message: "success get categories",
        status: "success",
        categories: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUserCourses(req, res, next) {
    const { id: UserId } = req.user_login;
    try {
      const usercourses = await UserCourse.findAll({
        where: {
          status: "active",
          UserId: +UserId,
        },
        include: [
          {
            model: Course,
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
          },
        ],
      });

      res.status(200).json({
        code: 200,
        message: "Success get all your learning",
        status: "success",
        learnings: usercourses,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
