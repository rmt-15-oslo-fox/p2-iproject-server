const { User } = require('../models')
const {verify } = require('../helpers/jwt')

function authN(req, res, next){
    const token = req.headers.access_token
    
    if(token){
        const userData = verify(token)
        User.findOne({
            where:{
                id: userData.id,
                email: userData.email
            }
        })
        .then(data =>{
            req.user = {
                id: data.id,
                email: data.email
            }
            next()
        })
        .catch(err =>{
            res.status(401).json({message: 'Authentication failed'})
        })
    }else{
        res.status(401).json({message: 'Authentication failed'})
    }
}

module.exports = {
    authN
}