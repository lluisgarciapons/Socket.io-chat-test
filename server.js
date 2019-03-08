const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hey");
});

const port = process.env.PORT || 5000;

server = app.listen(port, () => console.log(`Server running on port ${port}`));
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("new user connected");

  socket.on("SEND_MESSAGE", function(data) {
    // Broadcast emits to everyone except the one who sent the socket
    socket.broadcast.emit("RECEIVE_MESSAGE", data);
  });
});
