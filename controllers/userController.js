const { User } = require("../models");
const { decode } = require('../helpers/bcryptjs')
const { sign } = require('../helpers/jwt')
class UserController {
  static async findAll(req, res, next) {
    try {
      const result = await User.findAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      const result = await User.create({ name, email, password });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (foundUser) {
        const isValid = decode(password, foundUser.password);
        if (isValid) {
          const access_token = sign({
            id: foundUser.id,
            email: foundUser.email,
          });
          res.status(200).json({ access_token });
        } else {
          throw {
            name: "Doesn't Match",
            status: 401,
            message: `Email / Password doesn't match`,
          };
        }
      } else {
        throw {
          name: "Doesn't Match",
          status: 401,
          message: `Email / Password doesn't match`,
        };
      }
    } catch (err) {
        console.log(err);
      next(err);
    }
  }  
}

module.exports = UserController;
