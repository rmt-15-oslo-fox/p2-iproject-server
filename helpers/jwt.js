const jwt = require('jsonwebtoken')

const getToken = (payload) => {
    return jwt.sign(payload,process.env.JWT_SECRET)
}
const decodeToken = (access_token) => {
    return jwt.verify(access_token,process.env.JWT_SECRET)
}

module.exports = {
    getToken,
    decodeToken
}