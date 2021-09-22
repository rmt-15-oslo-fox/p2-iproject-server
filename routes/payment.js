const express = require("express");
const paymentController = require("../controller/paymentController");
const router = express.Router();
const authorizationDelete = require("../middlewares/authorizationDelete");
const authorizePay = require("../middlewares/authorizePay");
const payment = require("../models/payment");
router.get("/", paymentController.reminderList);
router.get("/info", paymentController.info);
router.get("/status", paymentController.paymentStatus);
router.post("/", paymentController.addReminder);
router.post("/balance", paymentController.addBalance);
router.put("/:id", authorizePay, paymentController.pay);
router.post("/convert", paymentController.convertCurrency);
router.delete("/:id", authorizationDelete, paymentController.deletePayment);

module.exports = router;
