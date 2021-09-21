const { verify } = require(`../helpers/jwt.js`)
const { User } = require(`../models`)

const authentication = async (req, res, next) => {
    const token = req.headers.access_token
    // console.log(token, `oiiiiiii`);
    //rubah token jadi payload
    try {
      if(!token){
        // console.log(`oiiiii`);
        throw {
          name: `Forbidden`
        }
      } else {

        const payload = verify(token)
        //verivikasi payload ke DB
        // console.log(payload, `payloadAuth`);
        const foundUser = await User.findOne({
            where: {
                id: payload.id,
                email: payload.email
            }
        })
        if (!foundUser){
            throw new Error(`UserNotFound`)
        }

        //menambahkan data kedalam request
        req.user = {
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role
        }

        //Next biar lanjut
        next()
        
      }
    } catch (error) {
        next(error)
    }
}


module.exports = authentication