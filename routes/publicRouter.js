const { Router } = require("express");
const Controller = require("../controllers/controller");
const publicRouter = Router();

publicRouter.get("/courses", Controller.getAllCourses);
publicRouter.get("/courses/:id", Controller.getCourseDataById);
publicRouter.get("/categories", Controller.getAllCategories);
module.exports = publicRouter;
