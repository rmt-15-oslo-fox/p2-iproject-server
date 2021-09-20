const express = require("express");
const AuthController = require("../controllers/authController");
const authRouter = express();

authRouter.post("/register", AuthController.registerHandler);

module.exports = authRouter;
