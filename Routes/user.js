const UserController = require('../Controllers/user')
const router = require('express').Router()

router.get('/', UserController.register)

module.exports = router