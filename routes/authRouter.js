const express = require("express");
const AuthController = require("../controllers/authController");
const authRouter = express();

authRouter.post("/register", AuthController.registerHandler);
authRouter.post("/login", AuthController.loginHandler);

module.exports = authRouter;
