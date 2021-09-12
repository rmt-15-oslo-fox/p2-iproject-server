require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 4000
const router = require('./Routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use(cors())

app.use(router)

app.listen(port, () => {
    console.log('Listening on port', port);
})