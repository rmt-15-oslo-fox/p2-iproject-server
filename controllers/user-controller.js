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

  static async login(req, res, next) {
    const { email, password } = req.body

    try {
      const foundUser = await User.findOne({
        where: {
          email
        }
      })

      if (foundUser) {
        const isMatch = decode(password, foundUser.password)

        console.log(isMatch);
        if (isMatch) {
          const access_token = sign({
            id: foundUser.id,
            email: foundUser.email
          })

          res.status(200).json({
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            access_token
          })
        } else {
          throw {
            name: "NotMatchedUserError",
            message: "Email / password is wrong"
          }
        }
      } else {
        throw {
          name: "NotMatchedUserError",
          message: "Email / password is wrong"
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
