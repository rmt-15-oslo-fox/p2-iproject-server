require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const cors = require("cors");
const router = require("./routes/index");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

const users = [];

io.on("connection", (socket) => {
  console.log(`user connected`);

  socket.on("sendMessage", (data) => {
    // console.log(data);

    socket.broadcast.emit("broadcastMessage", data);
  });

  socket.on("joinCommunity", (user) => {
    users.push(user);
    console.log(user);
    console.log(users);
  });

  socket.on("getUsers", () => {
    io.emit("sendUser", users);
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(router);

httpServer.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
