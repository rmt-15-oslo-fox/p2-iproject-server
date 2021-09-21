const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/users', UserController.getUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.putUser);
router.post('/login', UserController.postLogin);
router.post('/register', UserController.postRegister);
router.post('/authGoogle', UserController.postAuthGoogle);

module.exports = router