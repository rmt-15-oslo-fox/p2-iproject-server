const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3630e2a7ebda45e09922b0e3084d713d');
const axios = require('axios');

class NewsController{
    static async getNews(req, res, next) {

        try {
            const param = {
                country : 'id',
                apiKey: '3630e2a7ebda45e09922b0e3084d713d',
                category: 'sports',
                q: req.query.q
            }
            const json = await axios.get('https://newsapi.org/v2/top-headlines', {params: param})
            const result = json.data
            res.status(200).json(result);
        } catch (err) {
            next(err)
        }
        
    }
}

module.exports = NewsController;