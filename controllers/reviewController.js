const { User, Review } = require(`../models`)


class ReviewController {
  static async createReview(req, res, next){
    const MovieId = req.params.MovieId
    const UserId = req.user.id;
    const { title, content, rating } = req.body
    try {
      const result = await Review.create({ title, content, rating, MovieId, UserId })
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async getReview(req, res, next){
    const MovieId = req.params.MovieId
    try {
      const result = await Review.findAll({where: {MovieId}})
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async editReview(req, res, next){
    
  }
}


module.exports = ReviewController