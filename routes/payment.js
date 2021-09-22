const express = require("express");
const paymentController = require("../controller/paymentController");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const authorizationDelete = require("../middlewares/authorizationDelete");

router.get("/", paymentController.reminderList);
router.post("/", paymentController.addReminder);
router.post("/", paymentController.addBalance);
router.put("/:id", authorization, paymentController.pay);
router.post("/", paymentController.convertCurrency);
router.delete("/:id", authorizationDelete, paymentController.deletePayment);

module.exports = router;
