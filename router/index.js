const router = require('express').Router()
const UserController = require('../controller/userController')
const errorHandler = require('../middlewares/errorHandler')


router.post('/oauth', UserController.oauthlogin)


router.use(errorHandler)

module.exports = router