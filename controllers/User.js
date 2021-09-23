const { User } = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')
const sendingEmail = require('../helpers/nodemailer')

class UserController {
    static async register(req,res,next){
        const { 
            username,
            password,
            city,
            email
        } = req.body

        const payload = {
            username,
            password,
            city,
            email
        }

        try {
            await User.create(payload)
            sendingEmail(payload)
            res.status(201).json()
        } catch (err) {
            const msg = err.errors.map(el => {
                return el.message
            })
            next({
                name : err.name,
                statusCode : 400,
                msg : msg[0]
            })
        }
    }

    static async login(req,res,next){
        const { username, password } = req.body
        try {
            const found = await User.findOne({
                where : {
                    username
                }
            })
            if(found){
                const correctPass = comparePass(password,found.password)
                if(!correctPass){
                    next({
                        name : 'E&P',
                        statusCode : 401
                    })
                }else{
                    const payload = {
                        username : found.username,
                        id : found.id
                    }
                    let access_token = getToken(payload)
                    res.status(200).json({
                        access_token
                    })
                }
            }else{
                next({
                    name : 'E&P',
                    statusCode : 401
                })
            }
        } catch (err) {
            next({
                name : 'InternalServerError',
                statusCode : 500
            })
        }
    }
}

module.exports = UserController