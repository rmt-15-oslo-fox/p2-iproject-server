const router = require("express").Router()

const authentication = require("../middlewares/authentication")
const uploadImage = require("../middlewares/multer")
const imageKit = require("../middlewares/imageKit")

const SparringController = require("../controllers/sparring-controller")

router.get("/", SparringController.findAll)
router.get("/:id", SparringController.findById)
router.use(authentication)
router.post("/", uploadImage, imageKit, SparringController.create)
router.post("/:id", uploadImage, imageKit, SparringController.update)

module.exports = router
