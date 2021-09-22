const ItemController = require("../controllers/itemController")

const router = require("express").Router()

router.get("/", ItemController.getItem)

module.exports = router