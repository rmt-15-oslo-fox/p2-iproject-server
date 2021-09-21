const { User, Review } = require(`../models`)
const { decode } = require(`../helpers/bcrypt.js`)
const { signIn } = require(`../helpers/jwt.js`)


class UserController {
  static async register(req, res, next){
    const { email, password, username } = req.body
    try {
      const user = await User.create({ email, password, username })
      res.status(201).json({
        id: user.id,
        email: user.email,
        username: user.username
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next){
    const {email, password} = req.body
    try {
      const user = await User.findOne({where: {email}})
      if(user){
        const isValid = decode(password, user.password)
        // console.log(isValid);
        if(isValid){
          // console.log(`woyyy`);
            const access_token = signIn({
                id: user.id,
                email: user.email,
                username: user.username
            });
            res.status(200).json({access_token})
        } else {
            
            throw{
                name: `WrongCredentials`,
                code: 401,
                message: `Email / Password is wrong`
            }    
        }
    } else {
        
        throw{
            name: `WrongCredentials`,
            code: 401,
            message: `Email / Password is wrong`
        }  
    }
    } catch (error) {
      next(error)
    }
  }
}


module.exports = UserController