const axios = require('axios')

const api1 = 'QFjCk1Q1Kox96QYKbLEf7YMcBqfALBt1eZrgNcpb'
const api2 = 'Y0Lixb7xv73Jg85WovOsr3SsWBhRlt2DaeRWyKFE'
const api3 = '6Z2HHk7WHW2SXqNxmQpQeIRMD1JdnTH9xzOPaN76'

const dummyData = {
  "language": "en-US",
  "region": "US",
  "quoteType": "EQUITY",
  "quoteSourceName": "Delayed Quote",
  "triggerable": false,
  "firstTradeDateMilliseconds": 971748000000,
  "priceHint": 2,
  "currency": "IDR",
  "marketState": "POSTPOST",
  "exchange": "JKT",
  "longName": "PT Astra International Tbk",
  "messageBoardId": "finmb_706870",
  "exchangeTimezoneName": "Asia/Jakarta",
  "exchangeTimezoneShortName": "WIB",
  "gmtOffSetMilliseconds": 25200000,
  "market": "id_market",
  "esgPopulated": false,
  "shortName": "Astra International Tbk.",
  "regularMarketChange": -125,
  "regularMarketChangePercent": -2.3696682,
  "regularMarketTime": 1632384798,
  "regularMarketPrice": 5150,
  "regularMarketDayHigh": 5325,
  "regularMarketDayRange": "5150.0 - 5325.0",
  "regularMarketDayLow": 5150,
  "regularMarketVolume": 27178400,
  "regularMarketPreviousClose": 5275,
  "bid": 5150,
  "ask": 5200,
  "bidSize": 0,
  "askSize": 0,
  "fullExchangeName": "Jakarta",
  "financialCurrency": "IDR",
  "regularMarketOpen": 5275,
  "averageDailyVolume3Month": 37890595,
  "averageDailyVolume10Day": 36146312,
  "fiftyTwoWeekLowChange": 700,
  "fiftyTwoWeekLowChangePercent": 0.15730338,
  "fiftyTwoWeekRange": "4450.0 - 6925.0",
  "fiftyTwoWeekHighChange": -1775,
  "fiftyTwoWeekHighChangePercent": -0.25631768,
  "fiftyTwoWeekLow": 4450,
  "fiftyTwoWeekHigh": 6925,
  "earningsTimestamp": 1627556340,
  "earningsTimestampStart": 1635159540,
  "earningsTimestampEnd": 1635508800,
  "trailingAnnualDividendRate": 87,
  "trailingPE": 15.323459,
  "trailingAnnualDividendYield": 0.01649289,
  "epsTrailingTwelveMonths": 336.086,
  "epsForward": 512.43,
  "epsCurrentYear": 425.98,
  "priceEpsCurrentYear": 12.089769,
  "sharesOutstanding": 40483598336,
  "bookValue": 4012.42,
  "fiftyDayAverage": 5195.294,
  "fiftyDayAverageChange": -45.293945,
  "fiftyDayAverageChangePercent": -0.008718264,
  "twoHundredDayAverage": 5192.75,
  "twoHundredDayAverageChange": -42.75,
  "twoHundredDayAverageChangePercent": -0.008232632,
  "marketCap": 208490530340864,
  "forwardPE": 10.050154,
  "priceToBook": 1.2835147,
  "sourceInterval": 10,
  "exchangeDataDelayedBy": 0,
  "tradeable": false,
  "symbol": "ASII.JK"
}

class FetchController {
  static async fetchCompositeIndex (req, res, next) {
    const { index } = req.query
    
    try {
      const { data } =  await axios({
        method: 'GET',
        url: `https://yfapi.net/v8/finance/spark?interval=1d&range=1mo&symbols=%5E${index}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': api3
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
          'x-api-key': api3
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
    // res.status(200).json(dummyData)
    try {
      const { data } =  await axios({
        method: 'GET',
        url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${stockName}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': api3
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
          'x-api-key': api3
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
}

module.exports = FetchController