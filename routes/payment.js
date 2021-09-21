const express = require("express");
const paymentController = require("../controller/paymentController");
const router = express.Router();

router.get("/", paymentController.reminderList);
router.post("/", paymentController.addReminder);
router.delete("/", paymentController.clearPayment);
router.post("/", paymentController.convertCurrency);

module.exports = router;
