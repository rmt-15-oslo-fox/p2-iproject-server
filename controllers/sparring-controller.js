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
}

module.exports = SparringController