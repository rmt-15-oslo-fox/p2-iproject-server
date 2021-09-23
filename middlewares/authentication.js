const { verify } = require("../helpers/jwt")
const { User } = require("../models")

const authentication = async (req, res, next) => {
  const token = req.headers.access_token

  try {
    const payload = verify(token)

    const foundUser = await User.findOne({
      where: {
        id: payload.id,
        email: payload.email,
      }
    })

    if (!foundUser) {
      throw {
        name: "NOTFOUND_authN",
        message: "Invalid JWT token"
      }
    }

    req.user = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role
    }

    next()
  } catch (err) {
    if (err.message === "NOTFOUND_authN") {
      next(err)
    } else {
      next({
        name: "JsonWebTokenError",
        message: "Something wicked happened"
      })
    }
  }
}

module.exports = authentication
