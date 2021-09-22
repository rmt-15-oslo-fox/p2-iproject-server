const jwt = require("jsonwebtoken")
const jwtSecret = process.env.SECRET


function signToken(payload) {
    return jwt.sign(payload, jwtSecret)
}

function verifyToken(payload) {
    return jwt.verify(payload, jwtSecret)
}

module.exports = { signToken, verifyToken }