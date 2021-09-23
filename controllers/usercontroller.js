const { User } = require('../models/')
const { decode } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController {
   // register
   static async register(req, res, next) {
    const { email, password } = req.body
    try {
      const newUser = await User.create({email, password})
      let result = {
        id: newUser.id,
        email: newUser.email
      }
      res.status(201).json(result)
    } catch (error) {
      if(error.name === 'SequelizeValidationError') {
        error = error.errors.map((err) => err.message)
        res.status(400).json(error)
      }
      res.status(500).json({message: 'Internal server error'})
    }
  }
  // login
  static async login(req, res, next) {
    const { email, password } = req.body
    try {
      const foundUser = await User.findOne({where: {email}})
      if(!foundUser) {
        res.status(401).json({message: 'Invalid Email/Password'})
      } else {
        const isMatch = decode(password, foundUser.password)
        if(!isMatch) {
          res.status(401).json({message: 'Invalid Email/Password'})
        } else {
          const access_token = sign({
            id: foundUser.id,
            email: foundUser.email
          })
          let result = {
            id: foundUser.id,
            email: foundUser.email,
            access_token: access_token
          }
          res.status(200).json(result)
        }
      }
    } catch (error) {
      if(error.name === 'SequelizeValidationError') {
        error = error.errors.map((err) => err.message)
        res.status(400).json(error)
      }
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = UserController