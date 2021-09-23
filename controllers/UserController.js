const {
    User
} = require('../models')
const {
    decode
} = require('../helpers/bcrypt');
const {
    signToken
} = require('../helpers/jwt');
const {
    OAuth2Client
} = require('google-auth-library');

class UserController {

    static async getUser(req, res, next) {
        try {
            const data = await User.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async deleteUser(req, res, next) {
        const {
            id
        } = req.params
        try {
            const checkData = await User.findByPk(id)
            if (checkData) {
                await User.destroy({
                    where: {
                        id
                    }
                })
                res.status(200).json({
                    message: `User id ${id} name ${checkData.name} success to delete`
                })
            } else {
                next({
                    name: "NotFound",
                    message: `User id ${id} not found`
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async putUser(req, res, next) {
        const {
            name,
            email,
            password
        } = req.body;
        const {
            id
        } = req.params;

        try {
            const checkData = await User.findByPk(id);
            if (checkData) {
                const userUpdate = await User.update({
                    name,
                    email,
                    password
                }, {
                    where: {
                        id
                    },
                    returning: true
                })

                res.status(200).json(userUpdate)
            } else {
                next({
                    name: "NotFound",
                    message: `User id ${id} not found`
                })
            }
        } catch (error) {
            if (err.name === 'SequelizeValidationError') {
                let error = err.errors.map(item => item.message)
                next({
                    message: error,
                    name: "SequelizeValidationError"
                })
            } else {
                next(err)
            }
        }
    }
    static async postLogin(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body;

            const findUser = await User.findOne({
                where: {
                    email
                }
            })

            if (findUser) {
                const isValid = decode(password, findUser.password)
                if (isValid) {
                    const token = signToken({
                        id: findUser.id,
                        name: findUser.name,
                        email: findUser.email,
                    })

                    res.status(200).json({
                        token
                    })
                } else {
                    next({
                        name: "InvalidEmailPass"
                    })
                }
            } else {
                next({
                    name: "InvalidEmailPass"
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async postRegister(req, res, next) {
        const {
            name,
            email,
            password
        } = req.body;

        try {
            const checkData = await User.findOne({
                where: {
                    email
                }
            })

            if (!checkData) {
                const createUser = await User.create({
                    name,
                    email,
                    password,
                    role: 'admin'
                })

                const data = {
                    id: createUser.id,
                    name: createUser.name,
                    role: createUser.role
                }

                res.status(200).json(data)
            } else {
                next({
                    name: "Forbidden",
                    message: "Email already use"
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async postAuthGoogle(req, res, next) {
        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        const client = new OAuth2Client(CLIENT_ID);
        const idToken = req.body.idTokenClient

        try {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: CLIENT_ID
            })

            const payload = ticket.getPayload()

            const {
                email,
                name
            } = payload

            const [user] = await User.findOrCreate({
                where: {
                    email
                },
                defaults: {
                    password: name,
                    role: 'admin'
                }
            })

            const access_token = signToken({
                id: user.id,
                email: user.email,
                role: user.role
            })

            res.status(200).json({
                access_token: access_token
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController