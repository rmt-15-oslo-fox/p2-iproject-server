const ErrorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'InternalServerError':
            res.status(err.statusCode).json({
                msg: 'Internal Server Error'
            })
            break;
        case 'E&P':
            res.status(err.statusCode).json({
                msg: 'Username/Password are Wrong'
            })
            break;
        case 'SequelizeValidationError':
            res.status(err.statusCode).json({
                msg: err.msg
            })
            break;
        case 'SequelizeUniqueConstraintError':
            res.status(err.statusCode).json({
                msg: err.msg
            })
            break;
        case 'Unauthentication':
            res.status(err.statusCode).json({
                msg: 'Please Login Before'
            })
            break;

        default:
            break;
    }
}

module.exports = ErrorHandler