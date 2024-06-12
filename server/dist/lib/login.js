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
// client/src/pages/api/auth/login.js
const DBConnection_js_1 = __importDefault(require("../../../../../server/src/lib/DBConnection.js"));
const cookie_1 = require("cookie");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'POST') {
            const { password } = req.body;
            try {
                // Query the database for user authentication
                const query = yield DBConnection_js_1.default.connectDB().query('SELECT * FROM users WHERE password = ?', [password]);
                if (query[0].length > 0) {
                    // User authenticated, generate session data
                    const sessionData = { /* Include necessary user data */};
                    const encryptedSessionData = encrypt(JSON.stringify(sessionData));
                    // Set the session cookie
                    const cookie = (0, cookie_1.serialize)('session', encryptedSessionData, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 60 * 60 * 24 * 7, // One week
                        path: '/',
                    });
                    res.setHeader('Set-Cookie', cookie);
                    res.status(200).json({ success: true });
                }
                else {
                    res.status(401).json({ success: false, message: 'Invalid password' });
                }
            }
            catch (error) {
                console.error('Authentication error:', error);
                res.status(500).json({ success: false, message: 'Server error' });
            }
        }
        else {
            res.status(405).json({ success: false, message: 'Method not allowed' });
        }
    });
}
exports.default = handler;
