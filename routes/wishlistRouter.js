const router = require('express').Router();
const WishlistController = require('../controllers/WishlistController');

router.post('/add', WishlistController.addwishlist);

module.exports = router