const errorHandler = (err, req, res, next) => {
  const { name } = err;
  let code = 500;
  let errors = [];
  let message = "";
  switch (name) {
    case "SequelizeUniqueConstraintError": {
      code = 400;
      errors.push("Email is already exists");
      message = "Bad Request";
      break;
    }
    case "SequelizeValidationError": {
      code = 400;
      errors = err.errors.map((e) => e.message);
      message = "Bad Request";
      break;
    }

    case "Login Error": {
      code = 401;
      errors = ["The email or password are incorrect"];
      message = "Login failed";
      break;
    }
    case "Course Error": {
      code = 400;
      errors = ["Course thumbnail is required"];
      message = "Create course failed";
      break;
    }

    case "Invalid Token":

    case "JsonWebTokenError": {
      code = 401;
      errors = ["Invalid Token"];
      message = "Authentication Failed";
      break;
    }

    case "Course Already Exists in Cart": {
      code = 400;
      errors = ["Course Already Exists in Cart"];
      message = "Failed add new item to cart";
      break;
    }

    case "Cart Not Found": {
      code = 404;
      errors = ["Cart not found"];
      message = "failed delete create";
      break;
    }

    case "Course Not Found": {
      code = 404;
      errors = ["Courses not found"];
      message = "failed checkout courses";
      break;
    }
    default: {
      break;
    }
  }
  res.status(code).json({
    code: code,
    status: "fail",
    message: message,
    errors: errors,
  });
};

module.exports = errorHandler;
