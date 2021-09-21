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


router.use(errorHandler)

module.exports = router