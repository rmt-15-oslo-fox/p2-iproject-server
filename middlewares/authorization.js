const { UserSparring } = require("../models")

const authorization = async (req, res, next) => {
  const userId = req.user.id
  const userSparringId = +req.params.id

  try {
    const foundUserSparring = await UserSparring.findByPk(userSparringId)

    if (!foundUserSparring) {
      throw {
        name: "NotFoundAuthorizationError",
        message: `User sparring with id ${userSparringId} not found`
      }
    }

    if (foundUserSparring.AuthorId !== userId) {
      throw {
        name: "ForbiddenError",
        message: "Not enough access"
      }
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorization