const { User } = require("../models")
const { decode } = require("../helpers/bcrypt")
const { sign } = require("../helpers/jwt")

class UserController {
  static async register(req, res, next) {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    try {
      const userRegister = await User.create(newUser)
      res.status(201).json({
        id: userRegister.id,
        username: userRegister.username,
        email: userRegister.email
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
