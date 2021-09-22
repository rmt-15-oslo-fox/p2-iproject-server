const { User } = require('../models')
const { decodeToken } = require('../helpers/jwt')

const auth = async (req,res,next) => {
    const access_token = req.headers.access_token
    const decode = decodeToken(access_token)
    try {
        const data = await User.findOne({
            where : {
                username : decode.username
            }
        })
        if(data){
            req.user = {
                username : data.username,
                city : data.city
            }
            next()
        }
    } catch (err) {
        next({
            statusCode : 401,
            name : 'Unauthentication'
        })
    }
}

module.exports = auth