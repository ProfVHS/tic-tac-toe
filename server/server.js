const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (data => {
        socket.join(data)
        console.log("user: " + socket.id + " room: " + data + " - " + socket.rooms.has(data))
    }))

    //pass gamestate and turn
    socket.on("pass_gameState", (data) => {
        socket.to(data.room).emit("receive_gameState", data)
    })

    //pass scores
    socket.on("pass_gameScore", (data) => {
        socket.to(data.room).emit("receive_gameScore", data)
    })

    //restart game
    socket.on("restartGame", (room) => {
        socket.to(room).emit("receive_restartGame")
    })
})


server.listen(3001, () => {
    console.log("SERVER LISTENING ON PORT 3001")
});