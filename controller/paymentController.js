const convertCurrency = require("../helpers/convertCurrency");
const sendNodemailer = require("../helpers/nodemailer");
const date = require("../helpers/date");
const convert = require("../helpers/convertCurrency");
const { User, Payment } = require("../models");

class PaymentController {
  static async info(req, res, next) {
    try {
      const info = await User.findByPk(req.login.id, {
        attributes: ["name", "balance", "id"],
      });
      res.status(200).json({ info });
    } catch (err) {
      next(err);
    }
  }

  static async reminderList(req, res, next) {
    try {
      const reminder = await Payment.findAll({
        where: { userId: req.login.id },
        include: {
          model: User,
          attributes: ["name"],
          as: "receiver",
        },
      });
      res.status(200).json({
        message: "Succeded in getting all reminder",
        reminder,
      });
    } catch (err) {
      next(err);
    }
  }

  static async paymentStatus(req, res, next) {
    try {
      const status = await Payment.findAll({
        where: { receiverId: req.login.id },
        include: {
          model: User,
          attributes: ["name"],
          as: "payer",
        },
      });
      res.status(200).json({
        message: "Succeded in getting all payment status",
        status,
      });
    } catch (err) {
      next(err);
    }
  }

  static async pay(req, res, next) {
    try {
      console.log(req.body.amount);
      const payment = await Payment.findByPk(req.params.id);
      const user = await User.findByPk(req.login.id);
      if (!payment) {
        throw {
          name: "Not Found",
          message: `Reminder with ${req.params.id} not found`,
        };
      }
      const leftAmount = Number(payment.amount) - Number(payment.paid);
      if (payment.status === "Paid off") {
        throw {
          name: "Bad Request",
          message: `Payment status has been paid off!`,
        };
      } else if (Number(user.balance) < Number(req.body.amount)) {
        throw {
          name: "Bad Request",
          message: `You have insufficient balance`,
        };
      } else if (leftAmount <= Number(req.body.amount)) {
        const user = await User.findByPk(req.login.id);
        const newUserBalance = Number(user.balance) - Number(leftAmount);
        const receiver = await User.findByPk(payment.receiverId);
        const newReceiverBalance =
          Number(receiver.balance) + Number(leftAmount);
        const paidAmount = Number(payment.paid) + Number(leftAmount);
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
            paid: paidAmount,
            status: "Paid off",
          },
          {
            where: { id: req.params.id },
            returning: true,
          }
        );
        sendNodemailer(
          req.login.email,
          "Payment success",
          `Payment to ${receiver.name} was done!`
        );
        res.status(200).json({ message: "Payment success" });
      } else if (payment.amount > req.body.amount) {
        const user = await User.findByPk(req.login.id);
        const newUserBalance = Number(user.balance) - Number(req.body.amount);
        const receiver = await User.findByPk(payment.receiverId);
        const newReceiverBalance =
          Number(receiver.balance) + Number(req.body.amount);
        const paid = payment.paid + Number(req.body.amount);
        const remainingAmount = Number(payment.amount) - paid;
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
          { paid },
          {
            where: { id: req.params.id },
            returning: true,
          }
        );
        sendNodemailer(
          req.login.email,
          "Payment success",
          `Payment to ${receiver.name} was done!`
        );
        res.status(200).json({
          message: `Payment success, remaining amount: ${remainingAmount}`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async addBalance(req, res, next) {
    const add = Number(req.body.amount);
    const user = await User.findByPk(req.login.id);
    const newBalance = user.balance + add;
    User.update(
      { balance: newBalance },
      {
        where: { id: req.login.id },
      }
    );
    res.status(200).json({ message: "balance added" });
  }

  static async addReminder(req, res, next) {
    const data = {
      userId: req.login.id,
      receiverId: req.body.receiverId,
      amount: req.body.amount,
      description: req.body.description,
      deadline: new Date(req.body.deadline),
      paid: 0,
      status: "active",
    };
    try {
      if (req.login.id === req.body.receiverId) {
        throw {
          name: "Bad Request",
          message: "You cannot request payment from yourself!",
        };
      }
      const user = await User.findByPk(req.body.receiverId);
      if (!user) {
        throw {
          name: "Not Found",
          message: `No user with id ${req.body.receiverId} found`,
        };
      }
      const addReminder = await Payment.create(data);
      if (addReminder) {
        res.status(201).json({
          message: "Success",
          receiverId: addReminder.receiverId,
          amount: addReminder.amount,
          description: addReminder.description,
          deadline: date(addReminder.deadline),
          paid: addReminder.paid,
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
      convert(
        req.body.amount,
        req.body.currencyFrom,
        req.body.currencyTo,
        function (err, amount) {
          res.status(200).json(amount);
        }
      );
    } catch (err) {
      next(err);
    }
  }

  static async getReminderById(req, res, next) {
    try {
      const data = await Payment.findByPk(req.params.id);
      if (!data) {
        throw {
          name: "Not Found",
          message: `reminder with ${req.params.id} not found`,
        };
      }
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PaymentController;
