"use strict";
// server/src/utils/auth.js
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
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'your-secret-key';
const createToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sign the JWT token with the payload and secret key
        const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' }); // Expires in 1 hour
        return token;
    }
    catch (error) {
        throw new Error('Failed to create token');
    }
});
exports.createToken = createToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        throw new Error('Failed to verify token');
    }
});
exports.verifyToken = verifyToken;
// Other authentication-related functions...
