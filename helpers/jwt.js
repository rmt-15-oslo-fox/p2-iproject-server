const jwt = require('jsonwebtoken')

function generateToken(payload){
    return jwt.sign(payload, 'hahaha')
}

function verify(token){
    return jwt.verify(token, 'hahaha')
}

module.exports ={
    generateToken,
    verify
}