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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postChat = exports.getChats = void 0;
const DBConnection_js_1 = __importDefault(require("./DBConnection.js"));
const getChats = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield DBConnection_js_1.default.connectDB().query("SELECT * FROM table_chat");
        if (!query[0] || !query[0].length) {
            throw new Error("No chat messages found");
        }
        const chatMessages = query[0];
        return chatMessages;
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to fetch chat messages");
    }
});
exports.getChats = getChats;
const postChat = (formData) => __awaiter(void 0, void 0, void 0, function* () {
    "use server";
    try {
        const { username, message } = Object.fromEntries(formData);
        const query = yield DBConnection_js_1.default.connectDB().query(`INSERT INTO table_chat (username, message) VALUES('${username}', '${message}')`);
        if (query[0].serverStatus === 1) {
            return { success: true, message: "Success" };
        }
        else {
            return { success: false, message: "Failed to insert chat messages" };
        }
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to insert chat messages");
    }
});
exports.postChat = postChat;
