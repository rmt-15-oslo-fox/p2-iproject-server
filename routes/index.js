const express = require("express");
const errorHandler = require("../middleware/error");
const authRouter = require("./authRouter");
const courseRouter = require("./courseRouter");
const publicRouter = require("./publicRouter");
const userRouter = require("./useRouter");
const router = express.Router();

router.use("/", authRouter);
router.use("/courses", courseRouter);
router.use("/users", userRouter);
router.use("/pub", publicRouter);
router.use(errorHandler);
module.exports = router;
