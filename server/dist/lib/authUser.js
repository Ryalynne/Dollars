"use strict";
"use server";
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
const DBConnection_js_1 = __importDefault(require("./DBConnection.js"));
// export const authenticate = async (password) => {
//   try {
//     const query = await  DBConnection.connectDB().query('SELECT * FROM users WHERE password = ?', [password]);
//     if (query[0].length > 0) {
//       return "user login"; 
//     } else {
//       throw new Error(password); 
//     }
//   } catch (error) {
//     console.error('Authentication error:', error);
//     throw new Error('Wrong Password');
//   }
// };
const cookie_1 = require("cookie");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'POST') {
            const { password } = req.body;
            try {
                const query = yield DBConnection_js_1.default.connectDB().query('SELECT * FROM users WHERE password = ?', [password]);
                if (query[0].length > 0) {
                    const token = 'your-generated-token'; // Generate a token here (e.g., JWT)
                    res.setHeader('Set-Cookie', (0, cookie_1.serialize)('auth-token', token, { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 }));
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
