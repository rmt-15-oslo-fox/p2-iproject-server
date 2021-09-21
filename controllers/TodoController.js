const { Todo, Tag } = require("../models");

class TodoController {
  static async createTodo(req, res, next) {
    try {
      const { task, description } = req.body;
      const userId = req.user.id;

      const createTodo = await Todo.create({
        task,
        description,
        isComplete: "false",
        UserId: userId,
      });

      res.status(201).json({
        task: createTodo.task,
        description: createTodo.description,
        isComplete: createTodo.isComplete,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getUserTodos(req, res, next) {
    const id = +req.params.id;
    try {
      const todos = await Todo.findAll({
        where: {
          UserId: id,
        },
        attributes: {
          exclude: ["updatedAt"],
        },
        // include: [Tag],
      });

      if (!todos) {
        throw {
          name: "NOTFOUND",
          msg: "Task not found",
        };
      }

      res.status(200).json(todos);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodoController;
