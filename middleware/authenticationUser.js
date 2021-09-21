const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authenticationUser = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const payload = verifyToken(access_token);
    const { id, email } = payload;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });
    if (!user) {
      throw {
        name: "Invalid Token",
      };
    }

    req.user_login = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticationUser;
