const { User } = require("../models");

class UserController {
  static async updateProfileHandler(req, res, next) {
    const { id: UserId } = req.params;
    const { name, avatar_url } = req.body;
    try {
      const results = await User.update(
        {
          name: name ? name : req.user_login.name,
          avatar_url: avatar_url,
        },
        {
          where: {
            id: UserId,
          },
          returning: true,
        }
      );

      const updatedUser = results[1][0];
      console.log(updatedUser);
      res.status(200).json({
        code: 200,
        message: "Update profile successful",
        status: "success",
        user: {
          name: updatedUser.name,
          avatar_url: updatedUser.avatar_url,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfile(req, res, next) {
    const { id, email } = req.user_login;
    try {
      const user = await User.findOne({
        where: {
          id,
          email,
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });

      res.status(200).json({
        code: 200,
        message: "Success get data user",
        status: "success",
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
