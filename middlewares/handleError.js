const handleError = (err, req, res, next) => {
    let code = 500;
    let message = err.name;

    switch (err.name) {
        case "imageError":
            code = 400;
            message = [err.errors];
            break;
        case "SequelizeValidationError":
            code = 400;
            message = [err.errors];
            break;
        case "NotFound":
            code = 404;
            message = [err.message];
            break;
        case "NotAuthorized":
            code = 401;
            message = [err.message];
            break;
        case "Forbidden":
            code = 401;
            message = [err.message];
            break;
        case "InvalidEmailPass":
            code = 401;
            message = ["Wrong Email and Password"];
            break;
        default:
            break;
    }

    res.status(code).json({
        message
    })
}

module.exports = handleError