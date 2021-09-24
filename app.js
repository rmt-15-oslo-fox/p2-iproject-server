require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")
const routes = require("./routes/index.js")
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

const users = []

io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket);

  socket.on("sendMessage", (data) => {
    console.log(data, "<<<<< server");

    // io.emit("broadcastMessage", data)
    socket.broadcast.emit("broadcastMessage", data)
  })

  socket.on("loginUser", (user) => {
    console.log(user);
    users.push(user)

    io.emit("usersLogin", users)
  })
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(routes)

httpServer.listen(port, () => {
  console.log("App listen on port", +port);
})
