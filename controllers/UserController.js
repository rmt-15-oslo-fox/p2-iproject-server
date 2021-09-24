const { User, Todo, Community } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signPayload } = require("../helpers/jwt");
const axios = require("axios");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { username, email, password, birthDate, city } = req.body;
      const createUser = await User.create({
        username,
        email,
        password,
        birthDate,
        city,
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
        city: createUser.city,
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
      // console.log("sinii");
      const user = await User.findAll({
        // include: [Todo],
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      // console.log(user);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const id = req.user.id;
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async getAllCommunity(req, res, next) {
    try {
      const allCom = await Community.findAll();

      res.status(201).json(allCom);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async getAvatars(req, res, next) {
    try {
      const user = req.user.username;
      const response = await axios({
        method: "GET",
        baseURL: `https://avatars.dicebear.com/api/avataaars/${user}.svg`,
      });
      const data = response.data;
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
