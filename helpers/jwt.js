const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.SECRET_KEY


function signIn(payload){
    return jwt.sign(payload, JWT_Secret );

}

function verify(token){
    return jwt.verify(token, JWT_Secret)
}


module.exports = { signIn, verify }