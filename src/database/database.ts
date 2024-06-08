import mysql2, {
  ConnectionOptions,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

const config: ConnectionOptions = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "1111",
  database: "pdoolingodb",
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
