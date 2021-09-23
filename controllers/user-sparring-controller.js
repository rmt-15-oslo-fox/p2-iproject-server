const { UserSparring, User, Category } = require("../models")

class UserSparringController {
  static async findAll(req, res, next) {
    try {
      const userSparrings = await UserSparring.findAll({
        where: {
          AuthorId: req.user.id
        },
        order: [
          ["createdAt", "DESC"]
        ],
        include: [{
          model: User,
          attributes: ["id", "username", "email"]
        }, {
          model: Category,
          attributes: ["id", "name"]
        }]
      })
      res.status(200).json(userSparrings)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    const id = req.params.id
    try {
      const userSparringById = await UserSparring.findByPk(id)

      if (userSparringById) {
        res.status(200).json(userSparringById)
      } else {
        throw {
          name: "NotFoundUserSparringError",
          message: `User sparring with id ${id} not found`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    let temp = req.body
    const data = {
      teamName: temp.teamName,
      teamLogo: temp.imageUrl,
      description: temp.description,
      schedule: temp.schedule,
      location: temp.location,
      status: "Active",
      CategoryId: temp.CategoryId,
      AuthorId: req.user.id
    }

    try {
      const newUserSparring = await UserSparring.create(data)
      res.status(201).json(newUserSparring)
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    const id = req.params.id
    let temp = req.body
    const data = {
      teamName: temp.teamName,
      teamLogo: temp.imageUrl,
      description: temp.description,
      schedule: temp.schedule,
      location: temp.location,
      CategoryId: temp.CategoryId,
    }
    console.log(data);

    try {
      const userSparringById = await UserSparring.findByPk(id)

      if (userSparringById) {
        const editedUserSparring = await UserSparring.update(data, {
          where: {
            id
          },
          returning: true,
        })
        res.status(200).json(editedUserSparring[1][0])
      } else {
        throw {
          name: "NotFoundUserSparringError",
          message: `User sparring with id ${id} not found`
        }
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserSparringController