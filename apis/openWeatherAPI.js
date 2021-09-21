const axios = require('axios')
const api_key = '1e7aefea6f325d7533c8ba527dbd11f0'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/onecall',
    params: {
        exclude: 'minutely,hourly',
        appid: api_key,
        lang: 'id'
    }
})

module.exports = instance