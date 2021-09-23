const { Forum } = require('../models')

class ForumController {
  // show forum by stock name
  static async showForumByStockName(req, res, next) {
    const stockName = req.query.stockName
    try {
      const result = await Forum.findAll({where: {stockName}})
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  // add comment to specific stock
  static async addComment(req, res, next) {
    const { stockName, comment } = req.body
    const userId = req.user.id
    const commentator = req.user.email
    try {
      const newComment = await Forum.create({stockName, comment, commentator, userId})
      res.status(200).json(newComment)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = ForumController