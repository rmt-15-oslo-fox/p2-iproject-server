const UserController = require('../controllers/usercontroller')
const ForumController = require('../controllers/forumcontroller')
const WatchlistController = require('../controllers/watchlistcontroller')
const DemoController = require('../controllers/democontroller')
const { authentication, authorization } = require('../middlewares/auth')
const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.get('/forums', ForumController.showForumByStockName)
router.post('/forums', ForumController.addComment)

router.get('/watchlists', WatchlistController.showWatchlist)
router.post('/watchlists', WatchlistController.addToWatchlist)

router.get('/demo', DemoController.showDemoPortofolio)
router.post('/demo', DemoController.buyStock)
router.patch('/demo/:id', authorization, DemoController.sellStock)

module.exports = router