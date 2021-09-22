const { Router } = require("express");
const CourseController = require("../controllers/courseController");
const authenticationUser = require("../middleware/authenticationUser");
const uploadThumbnail = require("../middleware/imgur");
const fileUpload = require("../middleware/multer");
const courseRouter = Router();

courseRouter.use(authenticationUser);
courseRouter.post(
  "/",
  fileUpload.single("thumbnail_url"),
  uploadThumbnail,
  CourseController.createCourse
);

module.exports = courseRouter;
