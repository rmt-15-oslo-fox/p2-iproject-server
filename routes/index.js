const express = require('express')
const errorHandler = require('../middlewares/errorHandler')
const reviewRoute = require('./reviewRoute')
const userRoute = require('./userRoute')
const router = express.Router()


//User Routes
router.use(`/users`, userRoute)
router.use(`/reviews`, reviewRoute)

router.use(errorHandler)


module.exports = router