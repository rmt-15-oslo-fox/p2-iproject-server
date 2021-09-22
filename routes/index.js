const router = require("express").Router()

const handleError = require("../middlewares/handle-error")

const Users = require("./user-router")

router.use("/", Users)

router.use(handleError)

module.exports = router
