const axios = require('axios')
let { yahooFinanceApi, newsApiOrg } = require('../helpers/apiKey')

class FetchController {
  static async fetchCompositeIndex (req, res, next) {
    const { index } = req.query
    
    try {
      const { data } =  await axios({
        method: 'GET',
        url: `https://yfapi.net/v8/finance/spark?interval=1d&range=1mo&symbols=%5E${index}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': yahooFinanceApi()
        }
      })
      let composite = `^${index}`
      let timeStamp = data[composite].timestamp.map(element => {
        let newDate = new Date((element+(3600*7)) * 1000) // adjusting timzone for deploy region (Heroku-US)
        let formattedDate = newDate.getDate().toLocaleString('id-ID') + '/' + newDate.getMonth().toLocaleString('id-ID')
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
          'x-api-key': yahooFinanceApi()
        }
      })
      let timeStamp = data[stockName].timestamp.map(element => {
        let newDate = new Date((element+(3600*7)) * 1000) // adjusting timzone for deploy region (Heroku-US)
        let formattedTime = newDate.getHours().toLocaleString('id-ID') + ':' + newDate.getMinutes().toLocaleString('id-ID')
        return formattedTime
      });
      data[stockName].timestamp = timeStamp

      if(stockName.includes('JK')) {
        data[stockName].close.unshift(data[stockName].previousClose)
      }

      data[stockName].close = data[stockName].close.filter(Number)

      if(data[stockName].close[0] > data[stockName].close[data[stockName].close.length -1]) {
        data[stockName].color = 'red'
      } else if (data[stockName].close[0] < data[stockName].close[data[stockName].close.length -1]) {
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
          'x-api-key': yahooFinanceApi()
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
          'x-api-key': yahooFinanceApi()
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
        url: `https://newsapi.org/v2/top-headlines?q=${keywords}&country=id&category=business&apiKey=${newsApiOrg()}`,
      })
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = FetchController