const { Sparring } = require("../models")

class SparringController {
  static async findAll(req, res, next) {
    try {
      const sparrings = await Sparring.findAll({
        where: {
          status: "Active"
        }
      })
      res.status(200).json(sparrings)
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    const id = req.params.id
    try {
      const findSparringById = await Sparring.findByPk(id)

      if (findSparringById) {
        res.status(200).json(findSparringById)
      } else {
        throw {
          name: "NotFoundSparringError",
          message: `Sparring with id ${id} not found`
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
      const newSparring = await Sparring.create(data)
      res.status(201).json(newSparring)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SparringController