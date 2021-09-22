const router = require('express').Router();
const WishlistController = require('../controllers/WishlistController');

router.post('/add', WishlistController.addwishlist);
router.get('/', WishlistController.wishlists);
router.delete('/:id', WishlistController.delete);

module.exports = router