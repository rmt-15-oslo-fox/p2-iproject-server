const router = require("express").Router()

const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const uploadImage = require("../middlewares/multer")
const imageKit = require("../middlewares/imageKit")

const UserSparringController = require("../controllers/user-sparring-controller")

router.use(authentication)
router.get("/", UserSparringController.findAll)
router.get("/:id", authorization, UserSparringController.findById)
router.post("/", uploadImage, imageKit, UserSparringController.create)
router.put("/:id", authorization, uploadImage, imageKit, UserSparringController.update)

module.exports = router
