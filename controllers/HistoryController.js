const {
    History
} = require('../models')

class HistoryController {

    static async getHistory(req, res, next) {
        try {
            const checkData = await History.findAll()
            if (checkData) {
                res.status(200).json(checkData)
            } else {
                next({
                    name: "NotFound",
                    message: "Contact not found"
                })
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = HistoryController