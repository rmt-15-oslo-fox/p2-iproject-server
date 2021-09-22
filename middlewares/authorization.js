const { Item, User } = require("../models")

authorization = async (req, res, next) => {
    const itemId = +req.params.id
    try {
        if (!itemId) {
            throw ({name: "Bad Request"})
        }
        const foundUser = await User.findOne({
            where: +req.user.id
        })
        const foundItem = await Item.findByPk(itemId)
        if (!foundItem) {
            throw ({name: "Not Found"})
        }
        const authorId = foundItem.UserId
        if (authorId === foundUser.id) {
            next()
        } else {
            throw ({name: "Forbidden"})
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization