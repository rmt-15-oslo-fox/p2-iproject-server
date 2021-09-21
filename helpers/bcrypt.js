const bcrypt = require('bcryptjs')

function encode(password){
    return hash = bcrypt.hashSync(password, bcrypt.genSaltSync(5))
}

function decode(password, hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    encode,
    decode
}