const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const {authN} = require('../middlewares/auth')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/places', Controller.getPlaces)
router.get('/restaurants', Controller.getRestaurant)
router.get('/hotels', Controller.getHotels)
router.get('/attractions', Controller.getAttractions)

router.use(authN)

router.post('/favourites', Controller.postFavourites)
router.get('/favourites', Controller.getFavourites)



module.exports = router