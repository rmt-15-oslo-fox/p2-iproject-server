const router = require('express').Router()
const UserRoutes = require('./user')
const CocktailController = require('./cocktail')

router.get('/', (req, res) => {
    res.send(`handling "/"`)
})

router.use('/users', UserRoutes)
router.use('/cocktails', CocktailController)

module.exports = router