const { User, Todo } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signPayload } = require("../helpers/jwt");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { username, email, password, birthDate } = req.body;
      const createUser = await User.create({
        username,
        email,
        password,
        birthDate,
      });

      if (!createUser) {
        throw {
          msg: "Username already exists",
        };
      }

      res.status(201).json({
        id: createUser.id,
        username: createUser.username,
        email: createUser.email,
        birthDate: createUser.birthDate,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async loginHandler(req, res, next) {
    try {
      const { username, password } = req.body;
      const foundUser = await User.findOne({
        where: {
          username,
        },
      });

      if (!foundUser) {
        throw {
          name: "NOTAUTHORIZED",
          msg: "Invalid email/password",
        };
      }

      const isMatch = comparePassword(password, foundUser.password);
      if (!isMatch) {
        throw {
          name: "NOTAUTHORIZED",
          msg: "Invalid email/password",
        };
      }
      const access_token = signPayload({
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      });

      res
        .status(200)
        .json({ access_token, id: foundUser.id, email: foundUser.email });
    } catch (err) {
      next(err);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const user = await User.findAll({
        include: [Todo],
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
