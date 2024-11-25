import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// Start the SocketIO server
const socket = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

socket.on("connection", (socket) => {
    console.log(socket)
})

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});