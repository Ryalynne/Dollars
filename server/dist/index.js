"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const Controller_1 = require("./lib/Controller");
const server = (0, http_1.createServer)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["POST", "GET"],
    }
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    // io.emit("user", user);
    try {
        const chats = yield (0, Controller_1.getChats)();
        io.emit("messages", chats);
    }
    catch (error) {
        socket.emit("error", "Failed to fetch chat messages");
    }
    console.log("working");
}));
server.listen(4000, () => {
    console.log("Server started on Port", 4000);
});
