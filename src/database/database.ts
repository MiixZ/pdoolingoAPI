import mysql2, {
  ConnectionOptions,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

const config: ConnectionOptions = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: Number(process.env.DB_PORT) || 3306,
  password: process.env.DB_PASSWORD || "1111",
  database: process.env.DB_NAME || "pdoolingodb",
  connectionLimit: 20,
  waitForConnections: true,
  queueLimit: 0,
};

const pool = mysql2.createPool(config);

class Database {
  async query<T extends RowDataPacket[] | ResultSetHeader>(
    sql: string,
    values?: any
  ) {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.query<T>(sql, values);
      return results;
    } finally {
      connection.release();
    }
  }
}

export default new Database();
