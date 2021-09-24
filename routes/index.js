const TodoController = require("../controllers/TodoController");
const UserController = require("../controllers/UserController");
const { errorHandler } = require("../errorHandlers/errorHandler");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginHandler);
router.get("/users", UserController.getAllUser);
router.use(authentication);
router.get("/user", UserController.getUserById);

router.get("/complete", TodoController.getUserTodosComplete); //menampilkan halaman yg udh complete
router.get("/todos/:id", TodoController.getUserTodos);
router.get("/weather", TodoController.getWeatherForecast);
router.get("/avatar", UserController.getAvatars);
router.post("/todos/:id", TodoController.createTodo);
router.delete("/todos/:id", authorization, TodoController.deleteById);
router.patch("/todos/:id", authorization, TodoController.completedTodo);
// router.post("/community", UserController.community);
router.get("/community", UserController.getAllCommunity);

router.use(errorHandler);
module.exports = router;
