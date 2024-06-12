"use server"
import DBConnection from '../../../server/src/lib/DBConnection.js';
import { NextResponse } from 'next/server';
import { middleware } from '@/middleware';

export const authenticate = async (password) => {
  try {
    const query = await DBConnection.connectDB().query('SELECT * FROM users WHERE password = ?', [password]);

    if (query[0].length > 0) {
      const request = {
        password: "/chat-room"
      };
      middleware(request);
      return "user login"; 
    } else {
      throw new Error(password); 
    }
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Wrong Password');
  }
};
