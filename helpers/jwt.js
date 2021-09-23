const jwt = require('jsonwebtoken');
const JWT_secret = 'Secret'

function sign(payload) {
    return jwt.sign(payload, JWT_secret);   
}

function verify(token) {
    return jwt.verify(token, JWT_secret)
}

module.exports = {
    sign,
    verify,
};