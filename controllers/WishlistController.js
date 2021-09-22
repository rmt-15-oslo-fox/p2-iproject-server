const { Wishlist } = require('../models');
const sendEmail = require('../helpers/sendEmail');

class WishlistController {
    static async addwishlist(req, res, next) {
        try {
            const { name, price, imageUrl, color, code } = req.body;
            const UserId = req.user.id;
            const result = await Wishlist.create({ name, price, imageUrl, color, code: `${code}`, UserId })
            sendEmail(req.user.email, name, price, color)
            res.status(201).json(result)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async wishlists(req, res, next) {
        try {
            const UserId = req.user.id;
            
            const products = await Wishlist.findAll({
                where: {
                    UserId
                }
            })
            res.status(200).json(products)
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const UserId = req.user.id;
            const id = req.params.id;

            const result = await Wishlist.destroy({
                where: {
                    UserId,
                    id
                }
            })
            res.status(200).json({
                message: "Success remove from wishlists"
            })
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = WishlistController;