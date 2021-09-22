
errorHandler = async (err, req, res, next) => {
    
    switch(err.name) {
        case "SequelizeValidationError":
            const errors = err.errors.map(el => {
                return el.message
            })
            res.status(400).json({errors});
            break;
        case "SequelizeUniqueConstraintError":
            const errors1 = err.errors.map(el => {
                return el.message
            })
            res.status(400).json({errors1});
            break;
        case "Bad Request":
            res.status(400).json({message: "Bad Request!"});
            break;
        case "Unauthorized":
            res.status(401).json({message: "Unauthorized!"});
            break;
        case "Fail Login":
            res.status(401).json({message: "Email/Password combination is wrong!"});
            break;
        case "Forbidden":
            res.status(403).json({message: "Forbidden!"});
            break;
        case "Not Found":
            res.status(404).json({message: "Not Found!"});
            break;
        default:
            res.status(500).json({message: "Internal Server Error"})
    }
}
//400 salah client

module.exports = errorHandler