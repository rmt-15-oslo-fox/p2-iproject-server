const TodoController = require("../controllers/TodoController");
const UserController = require("../Controllers/UserController");
const { errorHandler } = require("../errorHandlers/errorHandler");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const router = require("express").Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginHandler);
router.use(authentication);
router.get("/users", UserController.getAllUser);

router.get("/users/:id/todos", TodoController.getUserTodos);
router.post("/users/:id/todos", authorization, TodoController.createTodo);
router.use(errorHandler);
module.exports = router;
