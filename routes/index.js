const express = require("express");
const Controller = require("../controllers/controller");
const authenticationUser = require("../middleware/authenticationUser");
const errorHandler = require("../middleware/error");
const authRouter = require("./authRouter");
const cartRouter = require("./cartRouter");
const checkoutRouter = require("./checkoutRouter");
const courseRouter = require("./courseRouter");
const publicRouter = require("./publicRouter");
const userRouter = require("./useRouter");
const router = express.Router();
router.use("/pub", publicRouter);
router.use("/courses", courseRouter);
router.use("/", authRouter);
router.use("/", checkoutRouter);
router.use("/users", userRouter);
router.use("/carts", cartRouter);
router.use(authenticationUser);
router.get("/learnings", Controller.getAllUserCourses);
router.use(errorHandler);
module.exports = router;
