const axios = require('axios')
// const json = require('../assets/table.json')

class TableController{
    static async getAll(req, res, next) {
        try {
            const param = {
                league : 39,
                season: 2021
            }
            const header = {
                "x-rapidapi-key": "0bd8a669b0dfe43d748248fdc429295a",
                "x-rapidapi-host": "v1.baseball.api-sports.io"
            }
            const json = await axios({
                url: "https://v3.football.api-sports.io/standings",
                method: 'GET',
                params: param,
                headers: header
            })
            console.log(json);
            const result = json.data
            res.status(200).json(result);

        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = TableController;