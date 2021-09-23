const { Club } = require('../models')

class ClubController {
    static async getAll(req, res, next) {
        try {
          const result = await Club.findAll();
          res.status(200).json(result);
        } catch (err) {
          next(err);
        }
    }
}

module.exports = ClubController;