const { Todo } = require("../models");
const authorization = async (req, res, next) => {
  const userId = req.user.id;
  const id = +req.params.id;
  try {
    console.log("aku");
    const foundTodos = await Todo.findByPk(id);
    if (!foundTodos) {
      throw {
        name: "NOTFOUND",
        msg: "Task not found",
      };
    }

    if (foundTodos.UserId !== userId) {
      throw {
        name: "FORBIDDEN",
        msg: "Doesn't have enough access!",
      };
    }
    // console.log("lewat ga");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization };
