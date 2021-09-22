const { Watchlist } = require('../models')

class WatchlistController {
  // show current user watchlist
  static async showWatchlist(req, res, next) {
    const userId = req.user.id
    try {
      const result = await Watchlist.findAll({where: {userId}})
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  // add stock to current user watchlist
  static async addToWatchlist(req, res, next) {
    const { stockName } = req.body
    const userId = req.user.id
    try {
      const added = await Watchlist.create({stockName, userId})
      res.status(200).json(added)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = WatchlistController