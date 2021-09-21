// const { Todo } = require("../models");
const authorization = async (req, res, next) => {
  const userId = req.user.id;
  const todoId = +req.params.id;

  try {
    // console.log(todoId, userId, ">>");
    if (userId !== todoId) {
      throw {
        name: "FORBIDDEN",
        msg: "Doesn't have enough access!",
      };
    }
    // console.log("aku");
    // const foundTodos = await Todo.findByPk(todoId);
    // if (!foundTodos) {
    //   throw {
    //     name: "NOTFOUND",
    //     msg: "Task not found",
    //   };
    // }

    // if (foundTodos.UserId !== userId) {
    //   throw {
    //     name: "FORBIDDEN",
    //     msg: "Doesn't have enough access!",
    //   };
    // }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization };
