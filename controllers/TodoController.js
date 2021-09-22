const { Todo, User } = require("../models");
const axios = require("axios");

class TodoController {
  static async createTodo(req, res, next) {
    console.log(req.body);
    try {
      const id = +req.params.id;
      const userIdLogin = req.user.id;
      // console.log(id, userIdLogin);
      const { task, description, deadline } = req.body;
      const tag = req.body.tag.split(", ");

      if (id !== userIdLogin) {
        throw {
          name: "FORBIDDEN",
          msg: "Doesn't have enough access!",
        };
      }
      const createTodo = await Todo.create({
        task,
        description,
        tag,
        deadline,
        isComplete: false,
        UserId: id,
      });
      res.status(201).json({
        code: 201,
        message: "successfully add new todo",
        result: createTodo,
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
          isComplete: false,
        },
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

  static async getUserTodosComplete(req, res, next) {
    const id = +req.params.id;
    try {
      const todos = await Todo.findAll({
        where: {
          UserId: id,
          isComplete: true,
        },
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

  static async getTodoById(req, res, next) {
    const id = +req.params.id;
    // const userId = req.user.id;
    try {
      const findTodos = await Todo.findByPk(id, {
        attributes: {
          include: [User],
        },
      });

      if (!findTodos) {
        throw {
          name: "NOTFOUND",
          msg: `Task with id ${id} not found`,
        };
      }
    } catch (err) {
      next(err);
    }
  }

  static async editUserTodos(req, res, next) {
    const id = +req.params.id;
    const { task, description, deadline } = req.body;
    const tag = req.body.tag.split(", ");
    try {
      const findTodos = await Todo.findByPk(id);

      if (!findTodos) {
        throw {
          name: "NOTFOUND",
          msg: `Task with id ${id} not found`,
        };
      }

      const updatedTodo = await Todo.update(
        {
          task: task,
          description: description,
          tag: tag,
          deadline: deadline,
        },
        {
          where: {
            id: findTodos.id,
          },
          returning: true,
        }
      );

      let result = updatedTodo[1][0];

      res.status(200).json({
        message: `Task with id ${result.id} updated successfully`,
        result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteById(req, res, next) {
    const id = +req.params.id;
    try {
      const foundTodo = await Todo.findByPk(id);
      if (!foundTodo) {
        throw {
          name: "NOTFOUND",
          msg: `Task with id ${id} not found`,
        };
      }
      const delTodo = await Todo.destroy({
        where: {
          id: id,
        },
        returning: true,
      });

      if (!delTodo) {
        throw {
          name: "NOTFOUND",
          message: `Task with id ${id} not found`,
        };
      }

      res.status(200).json({
        code: 200,
        message: `Task with id ${id} deleted succesfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async completedTodo(req, res, next) {
    const id = +req.params.id;
    const { isComplete } = req.body;
    try {
      const findTodo = await Todo.findByPk(id);

      if (!findTodo) {
        throw {
          name: "NOTFOUND",
          message: `Task with id ${id} not found`,
        };
      }

      // console.log("apa km nemu Todo");

      let updateStatus = await Todo.update(
        {
          isComplete: isComplete,
        },
        {
          where: {
            id: findTodo.id,
          },
          returning: true,
        }
      );

      let updateStatusTodo = updateStatus[1][0];

      res.status(200).json({
        code: 200,
        msg: `Task with id ${id} is updated successfully`,
        data: updateStatusTodo,
      });
    } catch (err) {
      next(err);
    }
  }

  //third party API
  static async getWeatherForecast(req, res, next) {
    try {
      const city = req.user.city;
      const response = await axios({
        method: "GET",
        baseURL: `http://api.weatherapi.com/v1/current.json?key=be79306e2ba647f291b24040212109&q=${city}&aqi=no`,
      });
      res.status(200).json({
        location: response.data.location,
        current: response.data.current,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodoController;
