const { Payment } = require("../models/");

const authorization = async (req, res, next) => {
  const { id } = req.login;
  try {
    const result = await Payment.findByPk(req.params.id);
    if ((result.receiverId = id || result.status === "Paid off")) {
      next();
    } else {
      throw {
        name: "Forbidden",
        message: `You are not authorized to do this action`,
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
