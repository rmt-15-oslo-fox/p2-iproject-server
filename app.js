require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")
const routes = require("./routes/index.js")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(routes)

app.listen(port, () => {
  console.log("App listen on port", +port);
})
