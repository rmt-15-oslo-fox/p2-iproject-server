const express = require("express");
const errorHandler = require("../middleware/error");
const authRouter = require("./authRouter");
const router = express.Router();

router.use("/", authRouter);

router.use(errorHandler);
module.exports = router;
