const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const messages = [];

app.get("/api/data", (req, res) => {
  res.json(messages);
});

io.on("connection", (socket) => {
  console.log("connection made successfully");
  socket.on("message", (payload) => {
    console.log("Message received on server: ", payload);
    io.emit("message", payload);
    messages.push(payload);
  });
});

server.listen(3002, () => {
  console.log("I am listening at port)");
});

