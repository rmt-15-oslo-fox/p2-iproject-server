const errorHandler = (err, req, res, next) => {
  const { name } = err;
  let code = 500;
  let errors = [];
  let message = "";
  switch (name) {
    case "SequelizeUniqueConstraintError": {
      code = 400;
      errors.push("Email is already exists");
      message = "Registration failed";
      break;
    }
    case "SequelizeValidationError": {
      code = 400;
      errors = err.errors.map((e) => e.message);
      message = "Registration failed";
      break;
    }

    case "Login Error": {
      code = 401;
      errors = ["The email or password are incorrect"];
      message = "Login failed";
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
