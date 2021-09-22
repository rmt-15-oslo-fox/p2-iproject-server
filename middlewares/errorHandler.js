const errorHandler = (err, req, res, next) => {
    const code = 500
    const message = 'internal server error'

    switch (err.name) {
        // case value:
            
        //     break;
    
        default:
            break;
    }

    console.log(err);
    res.status(code).json({message})
}

module.exports = errorHandler