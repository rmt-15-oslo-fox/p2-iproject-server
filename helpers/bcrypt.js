const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


function encode(plain){
    return bcrypt.hashSync(plain, salt);

}

function decode(plain, hashedPassword){
    return bcrypt.compareSync(plain, hashedPassword);

}


module.exports = {encode, decode}