const { Router } = require("express");
const authenticationUser = require("../middleware/authenticationUser");
const CourseController = require("../controllers/courseController");

const checkoutRouter = Router();
checkoutRouter.post("/midtrans", CourseController.notifMidtransHandler);
checkoutRouter.use(authenticationUser);
checkoutRouter.post("/checkout", CourseController.checkoutCourse);

module.exports = checkoutRouter;
