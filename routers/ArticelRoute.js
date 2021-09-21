const router = require('express').Router();
const ArticleController = require('../controllers/ArticleController');

router.get('/', ArticleController.getArticle);
router.post('/', ArticleController.postArticle);
router.delete('/:id', ArticleController.deleteArticle);
router.put('/:id', ArticleController.putArticle);

module.exports = router