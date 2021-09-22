const { Item, User } = require("../models")

class ItemController {
    static async getItem(req, res, next) {
        try {
            const status = req.query.status || "Active"
            const pageLimit = req.query.pageLimit || 10
            const pageOffset = (req.query.pageNumber*pageLimit) - pageLimit || 0
            const result = await Item.findAndCountAll({
                include: [User],
                limit: pageLimit,
                offset: pageOffset,
                where: {
                    status: status
                }
            })
            res.status(200).json(result)
        } catch (err) {
            console.log(err)
            next(err)
        }
        
    }
    static async addItem(req, res, next) {

    }
    static async getItemById(req, res, next) {

    }
    static async updateItem(req, res, next) {

    }
    static async deleteItem(req, res, next) {

    }
}

module.exports = ItemController