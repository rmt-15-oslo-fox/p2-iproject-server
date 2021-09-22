if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")
const router = require("./routers/index")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})