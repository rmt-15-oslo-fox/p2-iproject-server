const CocktailController = require('../Controllers/cocktail')
const router = require('express').Router()

router.get('/', CocktailController.add)

module.exports = router