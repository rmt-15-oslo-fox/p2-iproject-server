

const errorHandler = (err, req, res, next) => {
    let code = 500;
    let message = [`Internal Server Error`]
    // console.log(err.name);

    if(err.name === `SequelizeValidationError`){
        code = 400
        if(err.errors[0].message === 'Validation max on rating failed' ){
          message = `Rating can't be higher than 5`
        } 
        else if(err.errors[0].message === 'Validation min on rating failed'){
          message = `Rating can't be lower than 0`
        }
        else {
          
          message = err.errors[0].message
        }
    }
    else if(err.name === `NOTFOUND`){
        code = err.code
        message = err.message
    }
    else if(err.name === `UserNotFound`){
        code = 401;
        message = `Invalid Token`
    }
    else if(err.name === `PostNotFound`){
        code = 404;
        message = `Post Not Found`
    }
    else if(err.name === `Forbidden`){
        code = 403;
        message = `Access Forbidden`
    }
     else if(err.name === `SequelizeUniqueConstraintError`){
        code = 400;
        if(err.errors[0].path === `email`){
          message = `email already used`
        } else {
          message = `username already used`
        }
    }
    else if(err.name === `WrongCredentials`){
        code = err.code //401
        message = err.message
    }


    res.status(code).json({message})
}


module.exports = errorHandler