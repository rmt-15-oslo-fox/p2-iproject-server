const axios = require('axios')

class apiController {
    static async getDataCovidIndo(req, res, next) {
        axios({
            url: 'https://data.covid19.go.id/public/api/update.json',
            method: 'get'
        })
            .then(resp => {
                res.status(200).json(resp.data.update.penambahan)
            })
            .catch(err => {
                next({
                    statusCode : 500,
                    name : 'INternalServerError'
                })
            })
    }

    static async getLocation(req, res, next) {
        axios({
            url: `https://lit-refuge-59785.herokuapp.com/`,
            method: 'get'
        })
            .then(resp => {
                res.status(200).json(resp.data)
            })
            .catch(err => {
                next({
                    statusCode : 500,
                    name : 'INternalServerError'
                })
            })
    }

    static async getProvince(req, res, next){
        axios({
            url : `https://dekontaminasi.com/api/id/covid19/hospitals`,
            method : 'get'
        })
            .then(resp1 => {
                axios({
                    url : `https://api.kawalcorona.com/indonesia/provinsi/`,
                    method : 'get'
                })
                .then(resp2 => {
                    const dataHospital = resp1.data
                    const dataProvince = resp2.data

                    const dataResult = {
                        dataHospital,
                        dataProvince
                    }

                    res.status(200).json(dataResult)
                })
                .catch(err => {
                    next({
                        statusCode : 500,
                        name : 'INternalServerError'
                    })
                })
                
            })
            .catch(err => {
                next({
                    statusCode : 500,
                    name : 'INternalServerError'
                })
            })
    }
}

module.exports = apiController