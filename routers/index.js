const router = require("express").Router()
const userRoute = require("./userRoute")
const itemRoute = require("./itemRoute")
const errorHandlers = require("../middlewares/errorhandlers")

router.use("/users", userRoute)
router.use("/items", itemRoute)
router.use(errorHandlers)

module.exports = router