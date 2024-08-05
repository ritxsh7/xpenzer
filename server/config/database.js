import postgresql from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = postgresql;

const {
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
} = process.env;

const pool = new Pool({
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DATABASE,
});

export default {
  query: async (sql, params) => {
    const client = await pool.connect();
    try {
      var result = await client.query(sql, params);
    } catch (error) {
      return { error };
    } finally {
      client.release();
    }
    return { result };
  },
};
