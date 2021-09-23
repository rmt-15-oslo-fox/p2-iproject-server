const { Payment } = require("../models/");

const authorizePay = async (req, res, next) => {
  const { id } = req.login;
  try {
    const result = await Payment.findByPk(req.params.id);
    if (!result) {
      throw {
        name: "Not Found",
        message: `Payment reminder with id ${req.params.id} not found`,
      };
    }
    if (result.receiverId === id) {
      throw {
        name: "Forbidden",
        message: `You cannot pay for yourself`,
      };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorizePay;
