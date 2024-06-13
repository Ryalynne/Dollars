const express = require('express');
import { Server } from 'socket.io';
import { createServer } from 'http';
import { getChats, postChat } from './lib/Controller';

const server = createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["POST", "GET"],
    }
});

io.on("connection", async (socket) => {

    // io.emit("user", user);
    try {
        const chats = await getChats();
        const user = await getChats();
        io.emit("messages", chats); 
        io.emit("messages", user); 
    } catch (error) {
        socket.emit("error", "Failed to fetch chat messages");
    }
    console.log("working"); 
});

server.listen(4000, () => {
    console.log("Server started on Port", 4000);
});
