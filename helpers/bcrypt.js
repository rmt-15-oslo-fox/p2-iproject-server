const bcrypt = require('bcrypt')

const hasPass = (pass) => {
    return bcrypt.hashSync(pass,3)
}

const comparePass = (pass,passDb) => {
    return bcrypt.compareSync(pass,passDb)
}

module.exports = {
    hasPass,
    comparePass
}