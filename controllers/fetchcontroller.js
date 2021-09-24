const axios = require('axios')

// yahoo finance api
const api1 = 'QFjCk1Q1Kox96QYKbLEf7YMcBqfALBt1eZrgNcpb'
const api2 = 'Y0Lixb7xv73Jg85WovOsr3SsWBhRlt2DaeRWyKFE'
const api3 = '6Z2HHk7WHW2SXqNxmQpQeIRMD1JdnTH9xzOPaN76'
const api4 = 'Cx4p0gRZHd7Ul03TyHFSC7oPJqMxPvuR4PZkbm2H'

// news api org
const newsapi = 'f19be7182e244e8fa43049d06f1e2920'

class FetchController {
  static async fetchCompositeIndex (req, res, next) {
    const { index } = req.query
    
    try {
      const { data } =  await axios({
        method: 'GET',
        url: `https://yfapi.net/v8/finance/spark?interval=1d&range=1mo&symbols=%5E${index}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': api4
        }
      })
      let composite = `^${index}`
      let timeStamp = data[composite].timestamp.map(element => {
        let newDate = new Date(element*1000) 
        // let formattedTime = newDate.getHours() + ' : ' + newDate.getMinutes()
        let formattedDate = newDate.getDate() + '/' + newDate.getMonth()
        return formattedDate
      });
      data[composite].timestamp = timeStamp

      if(data[composite].close[0] > data[composite].close[data[composite].close.length -1]) {
        data[composite].color = 'red'
      } else if (data[composite].close[0] < data[composite].close[data[composite].close.length -1]) {
        data[composite].color = 'green'
      } else {
        data[composite].color = 'yellow'
      }
      
      res.status(200).json(data[composite])

    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  static async fetchStockChart(req, res, next) {
    const { stockName } = req.query
    
    try {
      const { data } =  await axios({
        method: 'GET',
        url: `https://yfapi.net/v8/finance/spark?interval=15m&range=1d&symbols=${stockName}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': api4
        }
      })
      let timeStamp = data[stockName].timestamp.map(element => {
        let newDate = new Date(element*1000) 
        let formattedTime = newDate.getHours() + ' : ' + newDate.getMinutes()
        return formattedTime
      });
      data[stockName].timestamp = timeStamp

      if(data[stockName].close[0] > data[stockName].close[data[stockName].close.length -2]) {
        data[stockName].color = 'red'
      } else if (data[stockName].close[0] < data[stockName].close[data[stockName].close.length -2]) {
        data[stockName].color = 'green'
      } else {
        data[stockName].color = 'yellow'
      }

      res.status(200).json(data[stockName])
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  static async searchStock(req, res, next) {
    const { stockName } = req.query
    
    try {
      const { data } =  await axios({
        method: 'GET',
        url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stockName}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': api4
        }
      })
      if(data.quoteResponse.result[0]){
        res.status(200).json(data.quoteResponse.result[0])
      } else {
        res.status(404).json({message: 'Stock not found'})
      }
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  static async bulkSearchStock(req, res, next) {
    const { stockName } = req.query
    try {
      const { data } =  await axios({
        method: 'GET',
        url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stockName}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': api4
        }
      })
      if(data.quoteResponse.result){
        res.status(200).json(data.quoteResponse.result)
      } else {
        res.status(404).json({message: 'Stock not found'})
      }
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  static async fetchNews(req, res, next) {
    let { keywords } = req. query
    if(!keywords) {
      keywords = 'saham'
    }
    try {
      const { data } =  await axios({
        method: 'GET',
        url: `https://newsapi.org/v2/top-headlines?q=${keywords}&country=id&category=business&apiKey=${newsapi}`,
      })
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = FetchController