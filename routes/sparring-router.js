const router = require("express").Router()

const SparringController = require("../controllers/sparring-controller")

router.get("/", SparringController.findAll)

module.exports = router
