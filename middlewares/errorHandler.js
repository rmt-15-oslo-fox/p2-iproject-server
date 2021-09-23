const errorHandler = (err, req, res, next) => {
    let status = 500;
    let message = ["Internal Server Error"]

    switch (err.name) {
        case "SequelizeValidationError":
            status = 400;
            message = err.errors.map (err => {
                return err.message
            });
            break;
        
        case "Not Found":
            status = 404;
            message = [err.message];
            break;
        
        case "Doesn't Match":
            status = 401;
            message = [err.message];
            break;

        case "invalidImage":
        case "Max size picture 255 kb":
            status = 400;
            message = [err.message]
            break
            
        default:
            break;
    }

    res.status(status).json( {message} );
};

module.exports = errorHandler;