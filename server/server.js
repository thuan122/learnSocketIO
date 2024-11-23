import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// Start the SocketIO server
const io = new Server(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile("D:\\studies\\learnSocketIO\\client\\index.html");
});

// On connection from the client, start listening the event called 'chat message'
// And when the client send a message, emitting back the message
io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg);
    // });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});