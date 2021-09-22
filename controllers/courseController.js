const { Category, Course, User } = require("../models");
class CourseController {
  static async createCourse(req, res, next) {
    const { id: instructorId } = req.user_login;
    const { category } = req.body;

    const convertToNumber = Number(category);

    try {
      if (!req.file) {
        throw {
          name: "Course Error",
        };
      }

      if (!convertToNumber) {
        const newCategory = await Category.create({ name: category });
        req.body.category = newCategory.id;
      }

      const newCourse = await Course.create({
        title: req.body.title,
        category_id: req.body.category,
        description: req.body.description,
        instructor_id: instructorId,
        thumbnail_url: req.body.avatar_url,
        price: req.body.price,
        course_level: req.body.course_level,
      });

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Create course successful",
        course: {
          id: newCourse.id,
          title: newCourse.title,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCourseByUserLogin(req, res, next) {
    try {
      const { id } = req.user_login;

      const courses = await Course.findAll({
        where: {
          instructor_id: id,
        },
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
        message: "success get all courses",
        status: "success",
        courses: courses,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CourseController;
