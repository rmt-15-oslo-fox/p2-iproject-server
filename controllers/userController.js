const { checkPassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User } = require("../models")
const nodemailer = require("nodemailer");
const axios = require("axios")

class UserController {
    static async register(req, res, next) {
        const { email, password, ip } = req.body
        try {
            const { data } = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.geoLocation}&ip_address=${ip}`)
            const result = await User.create({
                email,
                password,
                city: data.city,
                country: data.country
            })
            if (result) {
                let transporter = nodemailer.createTransport({
                    service: "gmail", // true for 465, false for other ports
                    auth: {
                      user: process.env.user, // generated ethereal user
                      pass: process.env.password, // generated ethereal password
                    },
                  })
                let mailOptions = {
                    from: process.env.user, // sender address
                    to: result.email, // list of receivers
                    subject: 'Welcome to Simple Admin Dashboard by Raditya!', // Subject line
                    text: 'Thank you for your participation!:)', // plain text body
                    html: `
                      <p>You have a new contact request</p>
                      <h3>Contact Details</h3>
                      <ul>  
                          <li>Email: ${result.email}</li>
                          <li>City: ${result.city}</li>
                          <li>Country: ${result.country}</li>
                      </ul>
                      <h3>Message</h3>
                  ` // html body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                });
                res.status(201).json({
                    id: result.id,
                    email: result.email,
                    city: result.city,
                    country: result.country
                })
            } else {
                throw ({name: "Bad Request"})
            }
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            const findUser = await User.findOne({where:{email}})
            if (findUser) {
                if(checkPassword(password, findUser.password)) {
                    console.log("masuk")
                    const access_token = signToken({
                        id: findUser.id,
                        email: findUser.email
                    })
                    console.log(access_token)
                    if (access_token) {
                        res.status(200).json({
                            id: findUser.id,
                            email: findUser.email,
                            access_token
                        })
                    }
                } else {
                    throw ({name: "Fail Login"})
                }
            } else {
                throw ({name: "Fail Login"})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController