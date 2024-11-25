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

let fakeData = []

// Utility function to find data index by ID
const findDataIndex = (id) => {
    return fakeData.findIndex(item => item.id === id);
};

socket.on("connection", (socket) => {
    console.log("Connected", 'ID: ', socket.id)

    // Emit the current data to the newly connected client
    socket.emit("listData", fakeData);

    socket.on("getData", () => {
        socket.emit("returnData", fakeData)
    })

    socket.on("data", (data) => {
        fakeData.push(data)
        console.table(fakeData);

        socket.emit("listData", fakeData)

        setInterval(() => {
            socket.emit("listData", fakeData)
        }, 3000)
    })

    socket.on("updateData", (data) => {
        const index = findDataIndex(data.id)

        if (index !== -1) {
            fakeData[index] = {
                ...fakeData[index],
                ...data.updateData
            }
            console.table("Updated record:", fakeData[index]);
        }
    })
})


server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});