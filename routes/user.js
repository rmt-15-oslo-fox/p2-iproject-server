const express = require("express");
const UserController = require("../controller/userController");
const router = express.Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/loginGoogle", UserController.googleLogin);

module.exports = router;
