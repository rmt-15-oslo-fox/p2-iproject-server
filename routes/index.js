const express = require("express");
const errorHandler = require("../middleware/error");
const authRouter = require("./authRouter");
const userRouter = require("./useRouter");
const router = express.Router();

router.use("/", authRouter);
router.use("/users", userRouter);
router.use(errorHandler);
module.exports = router;
