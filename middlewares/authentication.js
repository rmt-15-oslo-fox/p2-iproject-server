const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models")


authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw ({name: "Unauthorized"})
        } else {
            const result = verifyToken(access_token)
            if (!result) {
                throw ({name: "Unauthorized"})
            } else {
                // Fetch data user
                const foundUser = await User.findOne({
                    where: {
                        email: result.email
                    }
                })
                if (!foundUser) {
                    throw ({name: "Not Found"})
                } else {
                    req.user = {
                        id: result.id,      
                        email: result.email
                    }
                    next()
                }
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication