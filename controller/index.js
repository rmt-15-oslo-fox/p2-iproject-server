const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const { User, Mountain, Trip, GroupTrip } = require('../models')

class Controller {
    static async oauthlogin(req, res, next) {
        
        try {
            const CLIENT_ID = process.env.OAUTH_CLIENT_ID
            const { idToken } = req.body
            const client = new OAuth2Client(CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken,
                audience: CLIENT_ID
            })
            const payload = ticket.getPayload()
            
            const { email, name, jti } = payload

            const [user] = await User.findOrCreate({
                where: { email: email },
                defaults: {
                    name,
                    password: jti
                }
            })

            let jwtPayload = {
                id: user.id,
                email: user.email
            }


            const token = signToken(jwtPayload)

            res.status(201).json({ access_token: token })

        } catch (err) {
            next(err)
        }
    }

    static async getMountains(req, res, next){
        try {
            const Mountains = await Mountain.findAll({
                include: ['Tracks']
            })
            res.status(200).json(Mountains)
        } catch (err) {
            next(err)
        }
    }

    static async addTrip(req, res, next){
        try {
            let { MountId, TrackId, schedule } = req.body
            if(schedule == null){
                throw {name: 'schedulenull'}
            }
            schedule = new Date(schedule)
            const tripCreated = await Trip.create({
                MountId,
                TrackId,
                schedule
            })
            const userTrip = await GroupTrip.create({
                TripId: tripCreated.id,
                UserId: req.userLogin.id
            })
            res.status(201).json(tripCreated)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = Controller