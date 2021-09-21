const express = require("express");
const paymentController = require("../controller/paymentController");
const router = express.Router();
const authorization = require("../middlewares/authorization");

router.get("/", paymentController.reminderList);
router.post("/", paymentController.addReminder);
router.delete("/", authorization, paymentController.clearPayment);
router.post("/", paymentController.convertCurrency);

module.exports = router;
