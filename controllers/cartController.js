const { Cart, Course, User } = require("../models");

class CartController {
  static async deleteCartById(req, res, next) {
    const { id } = req.params;
    try {
      const totalDelete = await Cart.destroy({
        where: { id },
      });

      if (totalDelete === 0) {
        throw {
          name: "Cart Not Found",
        };
      }

      res.status(200).json({
        code: 200,
        message: `success delete cart with id ${id}`,
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCartByUserLoggedIn(req, res, next) {
    const { id: UserId } = req.user_login;

    try {
      const carts = await Cart.findAll({
        where: {
          UserId,
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: Course,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      res.status(200).json({
        code: 200,
        status: "success",
        message: "succes get list carts",
        carts,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createNewItem(req, res, next) {
    const { id: UserId } = req.user_login;
    const { CourseId } = req.body;
    try {
      const foundedItem = await Cart.findOne({
        where: {
          UserId,
          CourseId,
        },
      });

      if (foundedItem) {
        throw {
          name: "Course Already Exists in Cart",
        };
      }

      const cart = await Cart.create({ CourseId, UserId });
      res.status(201).json({
        code: 201,
        message: "success added course to cart",
        status: "success",
        cart: {
          id: cart.id,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
