const { User, Favourite } = require('../models')
const {encode, decode} = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const axios = require('axios')
const X_RapidAPI_Host = "travel-advisor.p.rapidapi.com"
const X_RapidAPI_Key = "7035591cf1msh9e1b17adb1471cbp1992abjsn8700c16fa59a"
const rapidUrl = "https://travel-advisor.p.rapidapi.com/"
const rapidHeaders = {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': '7035591cf1msh9e1b17adb1471cbp1992abjsn8700c16fa59a'
  }

class Controller{
    static register(req, res){
        const {email, password} = req.body
        const hashedPW = encode(password)

        User.create({email, password:hashedPW})
        .then(data =>{
            res.status(201).json({id:data.id,email:data.email})
        })
        .catch(err =>{
            if(err.errors){
                let listError = err.errors.map(item =>{
                    return {message: item.message}
                })
                res.status(400).json({listError})
            }else{
                res.status(500).json({message: "Internal Server Error"})
            }
        })
    }

    static login(req, res){
        const {email, password} = req.body

        User.findOne({
            where:{
                email
            }
        })
        .then(data =>{
            const passwordMatched = decode(password, data.password)
            if(passwordMatched){
                const access_token = generateToken({
                    id:data.id,
                    email:data.email
                })
                res.status(200).json({id:data.id,email:data.email,access_token})
            }else{
                res.status(401).json({message: 'Invalid Email/Password'})
            }
        })
        .catch(err =>{
            res.status(401).json({message: 'Invalid Email/Password'})
        })
    }

    static getPlaces(req, res){
        const page = +req.query.page || 1
        const limit = +req.query.size || 8
        const query = req.query.search || 'jakarta'
        
        let offset = (page - 1) * limit

        axios({
            method: "get",
            url: `${rapidUrl}/locations/search`,
            headers: rapidHeaders,
            params: {
                query,
                limit,
                offset,
                units: 'km'
            }
        })
        .then(response =>{
            let result = response.data.data
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static getRestaurant(req, res){
        const page = +req.query.page || 1
        const limit = +req.query.size || 8
        const location_id = +req.query.location_id || 294229
        
        let offset = (page - 1) * limit

        axios({
            method: "get",
            url: `${rapidUrl}/restaurants/list`,
            headers: rapidHeaders,
            params: {
                location_id,
                limit,
                offset,
                units: 'km'
            }
        })
        .then(response =>{
            let result = response.data.data
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static getHotels(req, res){
        const page = +req.query.page || 1
        const limit = +req.query.size || 8
        const location_id = +req.query.location_id || 294229
        const adults = +req.query.adults || 1
        const rooms = +req.query.rooms || 1
        const nights = +req.query.nights || 1
        
        let offset = (page - 1) * limit

        axios({
            method: "get",
            url: `${rapidUrl}/hotels/list`,
            headers: rapidHeaders,
            params: {
                location_id,
                limit,
                offset,
                adults,
                rooms,
                nights
            }
        })
        .then(response =>{
            let result = response.data.data
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static getAttractions(req, res){
        const page = +req.query.page || 1
        const limit = +req.query.size || 8
        const location_id = +req.query.location_id || 294229
        
        let offset = (page - 1) * limit

        axios({
            method: "get",
            url: `${rapidUrl}/attractions/list`,
            headers: rapidHeaders,
            params: {
                location_id,
                limit,
                offset,
                units: 'km'
            }
        })
        .then(response =>{
            let result = response.data.data
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static postFavourites(req, res){
        const userId = +req.user.id
        const {location_id, lat, long, imageUrl, address, rating, description} = req.query

        Favourite.create({userId, location_id, lat, long, imageUrl, address, rating, description})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err =>{
            res.status(500).json({message: "Internal Server Error"})
        })
    }

    static getFavourites(req, res){
        const userId = +req.user.id
        Favourite.findAll({
            where:{
                userId
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

}

module.exports = Controller