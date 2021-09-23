const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const { User, Mountain, Trip, GroupTrip, Equipment, EquipmentUser } = require('../models')
const { Op } = require('sequelize')
const geoCodingAPI = require('../apis/geoCodingAPI')
const weatherAPI = require('../apis/openWeatherAPI')

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

      res.status(201).json({ access_token: token, id: user.id, name: user.name })

    } catch (err) {
      next(err)
    }
  }

  static async getMountains(req, res, next) {
    try {
      const Mountains = await Mountain.findAll({
        include: ['Tracks']
      })
      res.status(200).json(Mountains)
    } catch (err) {
      next(err)
    }
  }

  static async addTrip(req, res, next) {
    try {
      let { MountId, TrackId, start_date, end_date } = req.body
      if (start_date == null || end_date == null) {
        throw { name: 'schedulenull' }
      }
      start_date = new Date(start_date)
      end_date = new Date(end_date)
      const tripCreated = await Trip.create({
        MountId,
        TrackId,
        start_date,
        end_date
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

  static async getMyTrip(req, res, next) {
    try {
      const UserId = req.userLogin.id
      let mytrip = await User.findByPk(UserId, {
        include: {
          model: Trip,
          include: ['Mountain', 'Track', 'Users']
        }
      })
      res.status(200).json(mytrip)
    } catch (err) {
      next(err)
    }
  }

  static async getAllTrip(req, res, next) {
    try {
      const alltrip = await Trip.findAll({
        include: ['Mountain', 'Track', 'Users']
      })
      res.status(200).json(alltrip)
    } catch (err) {
      next(err)
    }
  }

  static async joinTrip(req, res, next) {
    try {
      const { TripId } = req.body
      const UserId = req.userLogin.id
      const userTrip = await GroupTrip.create({
        TripId,
        UserId
      })
      res.status(200).json(userTrip)
    } catch (err) {
      next(err)
    }
  }

  static async deleteTrip(req, res, next) {
    try {
      const { TripId } = req.params
      const UserId = req.userLogin.id
      const isHasMember = await GroupTrip.findAll({
        where: {
          TripId
        }
      })
      if(isHasMember.length == 1){
        await Trip.destroy({
          where: {
            id: TripId
          }
        })
      } else {
        await GroupTrip.destroy({
          where: {
            TripId,
            UserId
          }
        })
      }
      res.status(200).json({ message: 'Trip was deleted' })
    } catch (err) {
      next(err)
    }
  }

  static async getWeather(req, res, next) {
    try {
      const { location } = req.query
      const loc = await geoCodingAPI.get('', {
        params: {
          address: location
        }
      })

      const { lat, lng } = loc.data.results[0].geometry.location

      const response = await weatherAPI.get('', {
        params: {
          lat,
          lon: lng
        }
      })

      const weather = response.data.daily.map(el => {
        let a = new Date(el.dt * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let day = days[a.getDay()]
        let fullDate = date + ' ' + month + ' ' + year
        return {
          day,
          fullDate,
          temp: (el.temp.day - 273.15).toFixed(2),
          cuaca: el.weather[0].description
        }
      })
      res.status(200).json(weather)
    } catch (err) {
      next(err)
    }
  }

  static async postEquipment(req, res, next){
    try {
      const {TripId, list} = req.body
      const listItem = Object.keys(list)
      
      listItem.forEach(async el => {
        const isDuplicate = await Equipment.findOne({
          where: {
            TripId,
            name: el
          }
        })
        if(!isDuplicate){
          await Equipment.create({
            TripId,
            name: el,
            jumlah: list[el]
          })
        } else {
          await Equipment.update({
            jumlah: +(list[el]) + +(isDuplicate.jumlah)
          },{
            where: {
              id: isDuplicate.id
            }
          })
        }
      })
      res.status(200).json({message: 'Success add equipment'})
    } catch (err) {
      next(err)
    }
  }

  static async getEquipmentById(req, res, next){
    try {
      const TripId = req.params.tripid
      const response = await Equipment.findAll({
        where: {
          TripId
        },
        // include: ['EquipmentUsers'],
        include: {
          model: EquipmentUser,
          include: {
            model: User
          }
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },{
        order: ['createdAt', 'ASC']
      })
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async postPJEquipment(req, res, next){
    try {
      const {EquipmentId, UserId} = req.body
      const isExist = await EquipmentUser.findOne({
        where: {
          EquipmentId,
          UserId
        }
      })
      if(isExist){
        await EquipmentUser.update({
          jumlah: +(isExist.jumlah) + 1
        }, {
          where: {
            EquipmentId,
            UserId
          }
        })
      } else {
        await EquipmentUser.create({
          EquipmentId,
          UserId,
          jumlah: 1
        })
      }
      res.status(201).json({message: 'success'})
    } catch (err) {
      next(err)
    }
  }

  static async deleteEquipmentUser(req, res, next){
    try {
      const {EquipmentId, UserId} = req.query
      const isExist = await EquipmentUser.findOne({
        where: {
          EquipmentId,
          UserId
        }
      })
      if(isExist.jumlah > 1){
        await EquipmentUser.update({
          jumlah: +(isExist.jumlah) - 1
        }, {
          where: {
            EquipmentId,
            UserId
          }
        })
      } else {
        await EquipmentUser.destroy({
          where: {
            EquipmentId,
            UserId
          }
        })
      }
      res.status(201).json({message: 'success'})
    } catch (err) {
      next(err)
    }
  }

  static async deleteEquipment(req, res, next){
    try {
      const { EquipmentId } = req.query
      await Equipment.destroy({
        where: {
          id: EquipmentId
        }
      })
      res.status(200).json({message: 'success deleted'})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller