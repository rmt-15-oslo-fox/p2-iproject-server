const router = require("express").Router()

const handleError = require("../middlewares/handle-error")

const Users = require("./user-router")
// const Sparrings = require("./sparring-router")

router.use("/", Users)
// router.use("/sparrings", Sparrings)

router.use(handleError)

module.exports = router
