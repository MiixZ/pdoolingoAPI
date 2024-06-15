import db from "../database/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface Insignia {
  id: number;
  n_ejercicios?: number;
  xp?: number;
  id_tema: number;
}

export class InsigniaModel {
  static async getInsignias(): Promise<Insignia[]> {
    const insignias = await db.query<RowDataPacket[]>(
      "SELECT * FROM INSIGNIAS"
    );

    return insignias as Insignia[];
  }

  static async getInsigniaByID(id: number): Promise<Insignia | null> {
    const insignia = await db.query<RowDataPacket[]>(
      "SELECT * FROM INSIGNIAS WHERE ID = ?",
      id
    );

    if (Array.isArray(insignia) && insignia.length > 0) {
      return insignia[0] as Insignia;
    }

    return null;
  }

  static async getInsigniasByTema(id_tema: number): Promise<Insignia[]> {
    const insignias = await db.query<RowDataPacket[]>(
      "SELECT * FROM INSIGNIAS WHERE ID_TEMA = ?",
      id_tema
    );

    return insignias as Insignia[];
  }

  static async createInsignia(data: Insignia): Promise<Insignia | null> {
    const result = await db.query<ResultSetHeader>(
      "INSERT INTO INSIGNIAS SET ?",
      data
    );

    if (result.insertId) {
      return this.getInsigniaByID(result.insertId);
    }

    return null;
  }

  static async updateInsignia(
    id: number,
    data: Insignia
  ): Promise<Insignia | null> {
    const result = await db.query<ResultSetHeader>(
      "UPDATE INSIGNIAS SET ? WHERE ID = ?",
      [data, id]
    );

    if (result.affectedRows > 0) {
      return this.getInsigniaByID(id);
    }

    return null;
  }

  static async deleteInsignia(id: number): Promise<boolean> {
    const result = await db.query<ResultSetHeader>(
      "DELETE FROM INSIGNIAS WHERE ID = ?",
      id
    );

    return result.affectedRows > 0;
  }
}
