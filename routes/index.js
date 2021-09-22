const router = require("express").Router();
const userRoutes = require("./user");
const listRoutes = require("./payment");
const { authentication } = require("../middleware/authentication");
const errHandler = require("../middleware/errHandler");

router.use("/", userRoutes);
router.use(authentication);
router.use("/list", listRoutes);
router.use(errHandler);

module.exports = router;
