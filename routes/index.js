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

router.get("/todos/:id", TodoController.getUserTodos);
router.get("/todos/complete/:id", TodoController.getUserTodosComplete); //menampilkan halaman yg udh complete
router.post("/todos/:id", TodoController.createTodo);
router.put("/todos/:id", authorization, TodoController.editUserTodos);
router.delete("/todos/:id", authorization, TodoController.deleteById);
router.patch("/todos/:id", authorization, TodoController.completedTodo);

router.use(errorHandler);
module.exports = router;
