const { Router } = require("express");
const uploadUserAvatar = require("../middleware/imgur");
const authenticationUser = require("../middleware/authenticationUser");
const fileUpload = require("../middleware/multer");
const UserController = require("../controllers/userController");
const userRouter = Router();

userRouter.use(authenticationUser);
userRouter.patch(
  "/:id",
  fileUpload.single("avatar"),
  uploadUserAvatar,
  UserController.changeAvatarHandler
);
userRouter.get("/profile", UserController.getUserProfile);

module.exports = userRouter;
