const router = require('express').Router();
const ArticleController = require('../controllers/ArticleController');
const imageMulter = require('../middlewares/multer');
const imageKit = require('../middlewares/imageKit');

router.get('/', ArticleController.getArticle);
router.post('/', imageMulter, imageKit, ArticleController.postArticle);
router.delete('/:id', ArticleController.deleteArticle);
router.put('/:id', imageMulter, imageKit, ArticleController.putArticle);

module.exports = router