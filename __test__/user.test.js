const app = require('../app')
const { User,sequelize } = require("../models")
const request = require('supertest')
const { queryInterface } = sequelize

describe('User test', () => {
    const dataUser = {
        username : 'wppq',
        password : 'wppq12',
    }

    describe('Post /Register', () => {
        afterAll(done => {
            queryInterface
                .bulkDelete('Users', null, {})
                .then(_ => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })

        test('Success Create User', done => {
            request(app)
                .post('/register')
                .send(dataUser)
                .then(resp => {
                    const { status } = resp
                    expect(status).toBe(201)
                    done()
                })
        })
    
        test('Bad request Username is null', done => {
            request(app)
                .post('/register')
                .send({
                    password : 'aowkoawk'
                })
                .then(resp => {
                    const { body,status } = resp
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg','User.username cannot be null')
                    done()
                })
        })
    
        test('Bad request password empty', done => {
            request(app)
                .post('/register')
                .send({
                    username : 'wppq@mail.com',
                    password : ''
                })
                .then(resp => {
                    const { body, status } = resp
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg','Password is required')
                    done()
                })
        })
    
        test('Bad request cause Username already exists', done => {
            request(app)
                .post('/register')
                .send(dataUser)
                .then(resp => {
                    const { body, status } = resp
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg','username must be unique')
                    done()
                })
        })
    })
    
    describe('Post /login', () => {
        beforeAll(done => {
            User.create(dataUser)
            .then(_ => {
                done()
            })
            .catch(err => {
                done(err)
            })
        })

        afterAll(done => {
            queryInterface
                .bulkDelete('Users',null,{})
                .then(_ => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })

        test('Success Login', done => {
            request(app)
                .post('/login')
                .send(dataUser)
                .then(resp => {
                    const { body, status } = resp
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token', expect.any(String))
                    done()
                })
        })

        test('One of bad request', done => {
            request(app)
                .post('/login')
                .send({
                    username : 'palsu@mail.com',
                    password : 'Palsu'
                })
                .then(resp => {
                    const { body, status } = resp
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('msg','Username/Password are Wrong')
                    done()
                })
        })
    })
})