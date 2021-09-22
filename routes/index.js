const ErrorHandler = require('../middlewares/ErrorHandler')
const router = require('express').Router()
const UserRouter = require('./userRouter')
const apisRouter = require('./get3rd')

router.use(UserRouter)
router.use(apisRouter)
router.use(ErrorHandler)

module.exports = router