import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.POSTGRES_CA.toString(),
  },
});

const db = {
  query: async (sql, params) => {
    try {
      const result = await pool.query(sql, params);
      return { result };
    } catch (error) {
      return { error };
    }
  },
};

export default db;
