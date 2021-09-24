const axios = require('axios');

class ApiController {

    static async getApiInstagram(req, res, next) {
        axios({
                method: "GET",
                url: "https://www.instagram.com/dagelan/channel/?__a=1"
            })
            .then((responseAxios) => {
                console.log(responseAxios.data);
                res.status(200).json({
                    data: responseAxios.data.graphql
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

}

module.exports = ApiController