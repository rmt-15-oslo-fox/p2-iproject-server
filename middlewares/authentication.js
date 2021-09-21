const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;

  try {
    const payload = verifyToken(access_token);

    const { id, username, email } = payload;

    const foundUser = await User.findOne({
      where: {
        id,
        username,
        email,
      },
    });

    if (!foundUser) {
      throw {
        name: "NOTAUTHORIZED",
        msg: "Invalid token",
      };
    }

    req.user = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
