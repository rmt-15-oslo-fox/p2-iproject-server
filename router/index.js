const router = require('express').Router()
const Controller = require('../controller')
const { authentication } = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler')

router.post('/oauth', Controller.oauthlogin)
router.get('/alltrip', Controller.getAllTrip)

router.use(authentication)

router.get('/mountains', Controller.getMountains)
router.post('/addtrip', Controller.addTrip)
router.get('/mytrip', Controller.getMyTrip)
router.post('/jointrip', Controller.joinTrip)
router.delete('/deleteTrip/:TripId', Controller.deleteTrip)
router.get('/weather', Controller.getWeather)
router.post('/equipment', Controller.postEquipment)
router.get('/equipment/:tripid', Controller.getEquipmentById)
router.post('/equipmentuser', Controller.postPJEquipment)
router.delete('/equipmentuser', Controller.deleteEquipmentUser)
router.delete('/equipment', Controller.deleteEquipment)

router.use(errorHandler)

module.exports = router