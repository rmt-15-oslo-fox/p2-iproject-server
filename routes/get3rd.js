const apiRouter = require('express').Router()
const apiController = require('../controllers/3rdParty')
const auth = require('../middlewares/auth')

apiRouter.get('/getDataCovidIndo',apiController.getDataCovidIndo)
apiRouter.use(auth)
apiRouter.get('/hospital/location',apiController.getLocation)
apiRouter.get('/province',apiController.getProvince)

module.exports = apiRouter