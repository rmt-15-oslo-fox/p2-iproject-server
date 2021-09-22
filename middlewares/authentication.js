const {
    User
} = require('../models');
const {
    verifyToken
} = require('../helpers/jwt');

const authentication = async (req, res, next) => {

    const token = req.headers.access_token;

    try {
        if (!token) {
            throw {
                name: "NotAuthorized",
                message: "You dont have access"
            }
        }

        const payload = verifyToken(token);
        const foundUser = await User.findOne({
            where: {
                id: payload.id,
                email: payload.email,
            }
        })

        if (!foundUser) {
            throw {
                name: "UserNotFound",
                message: "User Not Found"
            }
        }

        req.user = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
        }

        next()

    } catch (error) {
        if (error.message === "UserNotFound") {
            next({
                name: "NotFound",
                message: "Invalid JWT Token"
            })
        } else {
            next(error)
        }
    }

}

module.exports = authentication