const { checkPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
class AuthController {
  static async registerHandler(req, res, next) {
    const { name, email, password } = req.body;

    try {
      const newUser = await User.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Registration successfully",
        user: {
          email: newUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginHandler(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw {
          name: "Login Error",
        };
      }

      const isValidPassword = checkPassword(password, user.password);

      if (!isValidPassword) {
        throw {
          name: "Login Error",
        };
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = signToken(payload);
      res.status(200).json({
        code: 200,
        status: "success",
        message: "Login successful",
        access_token: token,
        user: {
          id: user.id,
          name: user.name,
          avatar_url: user.avatar_url,
          email: user.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
