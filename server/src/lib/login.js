// client/src/pages/api/auth/login.js
import DBConnection from '../../../../../server/src/lib/DBConnection.js';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;
    try {
      // Query the database for user authentication
      const query = await DBConnection.connectDB().query('SELECT * FROM users WHERE password = ?', [password]);
      
      if (query[0].length > 0) {
        // User authenticated, generate session data
        const sessionData = { /* Include necessary user data */ };
        const encryptedSessionData = encrypt(JSON.stringify(sessionData));
        
        // Set the session cookie
        const cookie = serialize('session', encryptedSessionData, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // One week
          path: '/',
        });
        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
