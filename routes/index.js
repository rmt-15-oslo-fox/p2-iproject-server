const router = require("express").Router()

const handleError = require("../middlewares/handle-error")

const Users = require("./user-router")
const UserSparrings = require("./user-sparring-router")

router.use("/", Users)
router.use("/user-sparrings", UserSparrings)

router.use(handleError)

module.exports = router
