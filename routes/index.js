const UserController = require('../controllers/usercontroller')
const WatchlistController = require('../controllers/watchlistcontroller')
const ForumController = require('../controllers/forumcontroller')
const DemoController = require('../controllers/democontroller')
const { authentication, authorization } = require('../middlewares/auth')
const FetchController = require('../controllers/fetchcontroller')
const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.get('/composites', FetchController.fetchCompositeIndex)
router.get('/stocks', FetchController.fetchStockChart)
router.get('/search', FetchController.searchStock)
router.get('/bulksearch', FetchController.bulkSearchStock)
router.get('/news', FetchController.fetchNews)

router.get('/forums', ForumController.showForumByStockName)
router.post('/forums', ForumController.addComment)

router.get('/watchlists', WatchlistController.showWatchlist)
router.post('/watchlists', WatchlistController.addToWatchlist)

router.get('/demo', DemoController.showDemoPortofolio)
router.post('/demo', DemoController.buyStock)
router.patch('/demo/:id', authorization, DemoController.sellStock)

module.exports = router