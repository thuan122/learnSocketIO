import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// Start the SocketIO server
// Adding cors, so that it won't blocking the client from connecting to the server
const socket = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

let scoreBoard = []

socket.on("connection", (socket) => {
    console.log("Connected", 'ID: ', socket.id)

    socket.on("score", (score) => {
        scoreBoard.push({ id: socket.id, ...score })
        console.log(scoreBoard)

        socket.emit("scoreBoard", scoreBoard)

        setInterval(() => {
            // Send to the client the scoreboard every 5s
            // So that it will update the scoreboard continuously
            socket.emit("scoreBoard", scoreBoard)
        }, 5000);
    })
})


server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});