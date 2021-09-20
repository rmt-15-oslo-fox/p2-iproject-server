const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: "NOTAUTHORIZED",
        msg: "Invalid token",
      };
    }
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

    // console.log(req.user);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
