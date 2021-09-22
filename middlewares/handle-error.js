function errorHandle(err, req, res, next) {
  console.log(err, "<<<<<<<<<<<");
  let code = 500
  let message = "Internal server error"

  switch (err.name) {
    case "SequelizeValidationError":
      code = 400
      message = err.errors[0].message
      break;
    case "SequelizeUniqueConstraintError":
      code = 400
      message = err.errors[0].message
      break;
    case "NotMatchedUserError":
      code = 401
      message = err.message
      break;
    case "NotFoundSparringError":
      code = 404
      message = err.message
      break;
    default:
      break;
  }
  res.status(code).json({ message })
}

module.exports = errorHandle
