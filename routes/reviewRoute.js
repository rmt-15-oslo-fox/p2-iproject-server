const express = require('express')
const reviewRoute = express.Router()

reviewRoute.post(`/:id`)

module.exports = reviewRoute