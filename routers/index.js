const UserRoute = require('./UserRoute');
const ArticelRoute = require('./ArticelRoute');
const HistoryRoute = require('./HistoryRoute');
const ContactRoute = require('./ContactRoute');
const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const errorHandler = require('../middlewares/errorHandler');

router.use('/user', UserRoute);
router.use(authentication);
router.use('/articles', ArticelRoute);
router.use('/history', HistoryRoute);
router.use('/contact', ContactRoute);
router.use(errorHandler);

module.exports = router