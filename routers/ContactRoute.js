const router = require('express').Router();
const ContactController = require('../controllers/ContactController');

router.get('/', ContactController.getContact);
router.post('/send', ContactController.postContact);
router.delete('/:id', ContactController.deleteContact);

module.exports = router