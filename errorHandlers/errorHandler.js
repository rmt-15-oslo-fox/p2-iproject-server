const errorHandler = (err, req, res, next) => {
  let code = 500;
  let msg = "Internal Server Error";

  if (err.name === "NOTFOUND") {
    code = 404;
    msg = err.msg;
  }
  if (err.name === "SequelizeValidationError") {
    code = 400;
    msg = err.errors.map((el) => el.message);
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    msg = err.errors.map((el) => {
      return (el.message = "Username already exists");
    });
  }
  res.status(code).json(msg);
};

module.exports = { errorHandler };
