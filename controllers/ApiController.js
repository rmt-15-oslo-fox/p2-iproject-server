const axios = require('axios');

class ApiController {

    static async getApiInstagram(req, res, next) {
        axios({
                method: "GET",
                url: "https://www.instagram.com/dagelan/channel/?__a=1"
            })
            .then((responseAxios) => {
                res.status(200).json({
                    data: responseAxios.data.graphql
                })
            })
    }

}

module.exports = ApiController