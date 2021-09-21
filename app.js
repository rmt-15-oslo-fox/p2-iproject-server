require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')
const port = process.env.PORT || 3000
const { createServer } = require("http");
const httpServer = createServer(app);
const io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
  console.log('user connected');

  socket.on("sendMessage", (data) => {
    console.log(data); 
    io.emit("broadcast", data)
    // socket.broadcast.emit("broadcast", data) pengirim ga nerima
  })

});


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(router)


httpServer.listen(port, () => {
    console.log('app listening on port', port)
})