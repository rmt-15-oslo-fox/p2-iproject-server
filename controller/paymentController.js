const convertCurrency = require("../helpers/convertCurrency");
const date = require("../helpers/date");
const convertCurrency = require("../helpers/convertCurrency");
const { Payment } = require("../models");

class PaymentController {
  static async reminderList(req, res, next) {
    try {
      const reminder = await Payment.findAll({
        where: { userId: req.login.id },
      });
      res.status(200).json({
        message: "Succeded in getting all reminder",
        reminder,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addReminder(req, res, next) {
    const data = {
      userId: req.login.id,
      receiverId: req.body.receiverId,
      amount: req.body.amount,
      description: req.body.description,
      deadline: req.body.deadline,
    };
    try {
      const addReminder = await Payment.create(data);
      if (addReminder) {
        res.status(201).json({
          message: "Success",
          receiverId: addReminder.receiverId,
          amount: addReminder.amount,
          description: addReminder.description,
          deadline: date(addReminder.deadline),
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async convertCurrency(req, res, next) {
    try {
      const converted = await convertCurrency(
        req.body.amount,
        req.body.currencyFrom,
        req.body.currencyTo,
        function (err, amount) {
          return amount;
        }
      );
      res.status(200).json(converted);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PaymentController;
