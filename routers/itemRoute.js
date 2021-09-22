const ItemController = require("../controllers/itemController")

const router = require("express").Router()
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.use(authentication)
router.get("/", ItemController.getItem)
router.post("/", ItemController.addItem)
router.put("/:id", authorization, ItemController.updateItem)
router.delete("/:id", authorization, ItemController.deleteItem)

module.exports = router