const UserRoute = require('./UserRoute');
const ArticelRoute = require('./ArticelRoute');
const HistoryRoute = require('./HistoryRoute');
const ContactRoute = require('./ContactRoute');
const ApiRoute = require('./ApiRoute');
const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/handleError');

router.use('/user', UserRoute);
router.use('/api', ApiRoute);
router.use(authentication);
router.use('/articles', ArticelRoute);
router.use('/history', HistoryRoute);
router.use('/contact', ContactRoute);
router.use(errorHandler);

module.exports = router