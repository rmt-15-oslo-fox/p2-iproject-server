const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  console.log(access_token);
  try {
    const payload = verifyToken(access_token);
    const { username, id } = payload;
    const user = await User.findOne({
      where: { username, id },
    });
    if (!user) {
      throw { name: "Invalid Token", message: `Invalid Token!` };
    }
    req.login = {
      id: user.id,
      username: user.username,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authentication,
};
