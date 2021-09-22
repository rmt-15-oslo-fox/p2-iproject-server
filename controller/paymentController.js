const convertCurrency = require("../helpers/convertCurrency");
const date = require("../helpers/date");
const convert = require("../helpers/convertCurrency");
const { User, Payment } = require("../models");

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

  static async pay(req, res, next) {
    try {
      const payment = await Payment.findByPk(req.params.id);
      if (!payment) {
        throw {
          name: "Not Found",
          message: `Reminder with ${req.params.id} not found`,
        };
      }
      if (User.balance < req.body.amount) {
        throw {
          name: "Bad Request",
          message: `You have insufficient balance`,
        };
      } else if (payment.amount <= req.body.amount) {
        const user = await User.findByPk(req.login.id);
        const newUserBalance = user.balance - payment.amount;
        const receiver = await User.findByPk(payment.receiverId);
        const newReceiverBalance = receiver.balance + payment.amount;
        User.update(
          { balance: newUserBalance },
          {
            where: { id: user.id },
            returning: true,
          }
        );
        User.update(
          { balance: newReceiverBalance },
          {
            where: { id: receiver.id },
            returning: true,
          }
        );
        Payment.update(
          {
            amount: 0,
            status: "Paid off",
          },
          {
            where: { id: req.params.id },
            returning: true,
          }
        );
        res.status(200).json({ message: "Payment success" });
      } else if (payment.amount > req.body.amount) {
        const user = await User.findByPk(req.login.id);
        const newUserBalance = user.balance - req.body.amount;
        const receiver = await User.findByPk(payment.receiverId);
        const newReceiverBalance = receiver.balance + req.body.amount;
        const leftoverAmount = payment.amount - req.body.amount;
        User.update(
          { balance: newUserBalance },
          {
            where: { id: user.id },
            returning: true,
          }
        );
        User.update(
          { balance: newReceiverBalance },
          {
            where: { id: receiver.id },
            returning: true,
          }
        );
        Payment.update(
          { amount: leftoverAmount },
          {
            where: { id: req.params.id },
            returning: true,
          }
        );
        res.status(200).json({ message: "Payment success" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async addBalance(req, res, next) {
    const { amount } = req.body;
    const user = User.findByPk(req.login.id);
    const newBalance = user.balance + amount;
    User.update(
      { balance: newBalance },
      {
        where: { id: req.login.id },
      }
    );
  }

  static async addReminder(req, res, next) {
    const data = {
      userId: req.login.id,
      receiverId: req.body.receiverId,
      amount: req.body.amount,
      description: req.body.description,
      deadline: req.body.deadline,
      status: "active",
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
          status: addReminder.status,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletePayment(req, res, next) {
    try {
      Payment.destroy({
        where: { id: req.params.id },
        returning: true,
      });
      res.status(200).json({ message: "Payment reminder deleted" });
    } catch (err) {
      next(err);
    }
  }

  static async convertCurrency(req, res, next) {
    try {
      const converted = await convert(
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
