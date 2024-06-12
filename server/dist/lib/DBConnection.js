"use strict";
// lib/DBConnection.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const DBPool_js_1 = __importDefault(require("./DBPool.js"));
const DBConnection = {
    connectDB: () => {
        try {
            const pool = mysql2_1.default.createPool(DBPool_js_1.default.dbConfig).promise();
            return pool;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to connect to the database");
        }
    }
};
exports.default = DBConnection;
