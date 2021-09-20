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
}

module.exports = AuthController;
