const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = 'internal server error'

    switch (err.name) {
        case 'SequelizeValidationError':
            code = 400
            message = err.errors.map(el => el.message)
            break;

        case 'Token Invalid':
            code = 400
            message = 'Authentication failed'
            break;

        case 'JsonWebTokenError':
            code = 400
            message = 'Please Login First'
            break;

        case 'SequelizeForeignKeyConstraintError':
            code = 400
            message = 'Wrong Mountain Id / Track Id'
            break;

        case 'idNotFound':
            code = 404
            message = 'Trip Id Not found'
            break;

        case 'Missing params location':
            code = 404
            message = 'Missing params location'
            break;
    
        case 'schedulenull':
            code = 400
            message = 'Pleese choose the date'
            break;
    
        default:
            break;
    }

    console.log(err);
    res.status(code).json({message})
}

module.exports = errorHandler