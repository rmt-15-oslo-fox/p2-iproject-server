const { Item, User } = require("../models")

class ItemController {
    static async getItem(req, res, next) {
        try {
            const result = await Item.findAll({
                include: [User]
            })
            res.status(200).json(result)
        } catch (err) {
            console.log(err)
            next(err)
        }
        
    }
    static async addItem(req, res, next) {
        const { title, description, tag } = req.body
        const { id } = req.user
        try {
            const result = await Item.create({
                title,
                description,
                tag,
                UserId: id
            })
            if (result) {
                res.status(201).json(result)
            } else {
                throw ({name: "Bad Request"})
            }
        } catch (err) {
            next(err)
        }
    }
    static async updateItem(req, res, next) {
        const { title, description, tag, status} = req.body
        try {
            const findId = await Item.findOne({where:{id: +req.params.id}})
            if (!findId) {
                throw ({name: "Not Found"})
            }
            const result = await Item.update({
                title,
                description,
                tag,
                status
            }, {
                where: {id: findId.id},
                returning: true
            })
            if (!result || !result[1][0]) {
                throw ({name: "Bad Request"})
            } else {
                res.status(200).json(result[1][0])
            }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async deleteItem(req, res, next) {
        try {
            const deletedItem = await Item.findByPk(+req.params.id)
            await Item.destroy({
                where: {
                    id: +req.params.id
                }
            })
            res.status(200).json({message: `Item with id ${req.params.id} and title ${deletedItem.title} has been deleted`})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ItemController