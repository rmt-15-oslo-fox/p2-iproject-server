require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes/index");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const formatMessage = require("./socketio/message");
const {
  joinRoom,
  getCurrentUser,
  userLeaveChat,
  getRoomChat,
} = require("./socketio/users");

const botWelcome = "HackBot";

//pas client connect
io.on("connection", (socket) => {
  socket.on("joinRoom", (payload) => {
    // console.log(payload, "first");

    const user = joinRoom(socket.id, payload.username, payload.room);
    // console.log(user, "km siapa");
    socket.join(user.room);
    //ini dpt room nyaaa

    //user pertama kali masuk
    socket.emit("message", formatMessage(botWelcome, "Welcome to RoomCom!"));
    // console.log("hmm");

    //user bergabung
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botWelcome, `${user.username} has joined the chat`)
      );
    //

    //info user dan room
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomChat(user.room),
    });
    //
  });

  socket.on("sendMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    // console.log(user, "disiniii");
    // console.log(msg);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  //user disconnect

  socket.on("disconnecting", () => {
    const user = userLeaveChat(socket.id);

    // socket.join(user.room);
    if (user) {
      socket
        .to(user.room)
        .emit(
          "message",
          formatMessage(botWelcome, `${user.username} has left the chat`)
        );

      socket.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomChat(user.room),
      });
    }
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(router);

httpServer.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
