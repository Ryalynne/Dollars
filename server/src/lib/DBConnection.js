// lib/DBConnection.js

import mysql from 'mysql2';
import DBPool from './DBPool.js';

const DBConnection = {
  connectDB: () => {
    try {
      const pool = mysql.createPool(DBPool.dbConfig).promise();
      return pool;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to connect to the database");
    }
  }
}

export default DBConnection;
