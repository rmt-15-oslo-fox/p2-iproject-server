const axios = require('axios')

const api1 = 'QFjCk1Q1Kox96QYKbLEf7YMcBqfALBt1eZrgNcpb'
const api2 = 'Y0Lixb7xv73Jg85WovOsr3SsWBhRlt2DaeRWyKFE'

class FetchController {
  static async fetchCompositeIndex (req, res, next) {
    const { index } = req.query
    
    try {
      const { data } =  await axios({
        method: 'GET',
        url: `https://yfapi.net/v8/finance/spark?interval=1d&range=1mo&symbols=%5E${index}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': api2
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
}

module.exports = FetchController