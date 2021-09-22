function errorHandle(err, req, res, next) {
  let code = 500
  let message = ["Internal server error"]

  switch (err.name) {
    case "SequelizeValidationError":
      console.log(err);
      break;
    default:
      break;
  }
  // res.status(code).json({ message })
}

module.exports = errorHandle
