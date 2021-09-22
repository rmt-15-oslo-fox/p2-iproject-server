const router = require("express").Router();
const userRoutes = require("./user");
const listRoutes = require("./payment");
const authentication = require("../middlewares/authentication");
const errHandler = require("../middlewares/errHandler");

router.use("/", userRoutes);
router.use(authentication);
router.use("/list", listRoutes);
router.use(errHandler);

module.exports = router;
