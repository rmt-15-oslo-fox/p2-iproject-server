const { nanoid } = require("nanoid");
const createTransaction = require("../helpers/midtrans");
const calculateTotalPrice = require("../helpers/calculateTotalPrice");
const { Category, Course, User, UserCourse } = require("../models");
class CourseController {
  static async createCourse(req, res, next) {
    const { id: instructorId } = req.user_login;
    try {
      if (!req.file) {
        throw {
          name: "Course Error",
        };
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

  static async checkoutCourse(req, res, next) {
    const { coursesIds } = req.body;
    try {
      const courses = await Course.findAll({
        where: {
          id: coursesIds,
        },
      });

      if (courses.length === 0 || courses.length !== coursesIds.length) {
        throw {
          name: "Course Not Found",
        };
      }

      const totalPrice = calculateTotalPrice(courses);
      const order_id = nanoid(30);
      const items_detail = courses.map((e) => {
        return {
          price: e.price,
          title: e.title,
          quantity: 1,
        };
      });

      const parameter = {
        transaction_details: {
          order_id: order_id,
          gross_amount: totalPrice,
        },
        credit_card: {
          secure: true,
        },
        items_detail: items_detail,
        customer_details: {
          first_name: req.user_login.name,
          email: req.user_login.email,
        },
        callbacks: {
          finish: "http://localhost:8080/",
        },
      };
      const results = await createTransaction(parameter);

      const payload = courses.map((course) => {
        return {
          UserId: req.user_login.id,
          CourseId: course.id,
          status: "pending",
          order_id: order_id,
        };
      });
      await UserCourse.bulkCreate(payload);
      res.status(201).json({
        code: 201,
        message: "success create new transaction",
        token: results.token,
        redirect_url: results.redirect_url,
      });
    } catch (err) {
      next(err);
    }
  }

  static async notifMidtransHandler(req, res, next) {
    const { transaction_status, order_id } = req.body;

    try {
      if (
        transaction_status === "settlement" ||
        transaction_status === "capture"
      ) {
        const results = await UserCourse.update(
          {
            status: "active",
          },
          { where: { order_id }, returning: true }
        );

        const courseIds = results[1].map((element) => {
          return element.CourseId;
        });

        const courses = await Course.findAll({
          where: {
            id: courseIds,
          },
        });

        const instructors = courses.map((course) => {
          return {
            price: course.price,
            instructor_id: course.instructor_id,
          };
        });

        for (let i = 0; i < instructors.length; i++) {
          const element = instructors[i];
          const user = await User.findOne({
            where: {
              id: element.instructor_id,
            },
          });
          user.balance += element.price;
          await user.save();
        }
        res.status(200);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CourseController;
