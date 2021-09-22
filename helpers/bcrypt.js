const bcrypt = require("bcrypt")

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5))
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, checkPassword }