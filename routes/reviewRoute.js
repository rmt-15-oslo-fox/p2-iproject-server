const express = require('express')
const ReviewController = require('../controllers/reviewController')
const authentication = require(`../middlewares/authentication`)
const reviewRoute = express.Router()

reviewRoute.get(`/:MovieId`, ReviewController.getReview)
reviewRoute.use(authentication)
reviewRoute.post(`/:MovieId`, ReviewController.createReview)
reviewRoute.put(`/review/:ReviewId`, ReviewController.editReview)

module.exports = reviewRoute