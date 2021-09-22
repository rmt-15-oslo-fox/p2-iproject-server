const { Router } = require("express");
const Controller = require("../controllers/controller");
const publicRouter = Router();

publicRouter.get("/courses", Controller.getAllCourses);

module.exports = publicRouter;
