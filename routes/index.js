const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/places', Controller.getPlaces)
router.get('/restaurants', Controller.getRestaurant)
router.get('/hotels', Controller.getHotels)
router.get('/restaurants', Controller.getRestaurant)



module.exports = router